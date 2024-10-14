import logging
import time
import os
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from langchain_community.document_loaders import SRTLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
import transformers
from transformers import AutoTokenizer
import torch
from django.conf import settings
from langchain.llms import HuggingFacePipeline

from time import time
from llama_app import views


import os
from langchain_community.document_loaders import SRTLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
import transformers
from transformers import AutoTokenizer
from torch import cuda, bfloat16
import torch
from time import time
#import chromadb
#from chromadb.config import Settings
from langchain.llms import HuggingFacePipeline
from flask_wtf.csrf import CSRFProtect
from IPython.display import display, Markdown
from flask import session
from elasticsearch import Elasticsearch, helpers
import os
import re
from langchain_community.document_loaders import SRTLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
import transformers
from transformers import AutoTokenizer
import torch
from langchain.llms import HuggingFacePipeline
from langchain.prompts import PromptTemplate


# Setup model with eos_token_id and pad_token_id
model_id = 'meta-llama/Llama-3.1-8B-Instruct'

bnb_config = transformers.BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type='nf4',
    bnb_4bit_use_double_quant=True,
    bnb_4bit_compute_dtype=torch.bfloat16
)

model_config = transformers.AutoConfig.from_pretrained(model_id, trust_remote_code=True, max_new_tokens=256)
model = transformers.AutoModelForCausalLM.from_pretrained(
    model_id, trust_remote_code=True, config=model_config, quantization_config=bnb_config, device_map='auto'
)

tokenizer = AutoTokenizer.from_pretrained(model_id)

# Define terminators
terminators = [
    tokenizer.eos_token_id,
    tokenizer.convert_tokens_to_ids("<|eot_id|>")
]

# Set up the pipeline for text generation with eos_token_id and pad_token_id
query_pipeline = transformers.pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_new_tokens=256,  # Limit to 256 tokens to keep responses concise
    eos_token_id=terminators,  # Ensure the model stops at the end of a sentence
    pad_token_id=tokenizer.pad_token_id,  # Proper padding for short sequences
    do_sample=True,
    temperature=0.3,
    top_p=0.9,
    device_map="auto"
)

llm = HuggingFacePipeline(pipeline=query_pipeline)

import re


# Define a function to dynamically generate a PromptTemplate based on the user input
def generate_prompt(query_text):
    # Handling greeting scenario
    query_text_lower = query_text.lower()

    # Handling greeting scenario
    if "course" in query_text_lower:
        template = """
        Your task id to Generate a course based on the Given context.

        Follow the following structured format to design the course:

            Program Name: Name of the program. 

            Program Description: Description of the program. 

            Courses: List of courses within the program, including: 

                Course Name: Name of the course. 

                Course Description: Description of the course. 

                Chapters: List of chapters within each course, including: 

                    Chapter Name: Name of the chapter. 

                    Chapter Description: Description of the chapter. 

                    Questions: List of questions for the chapter, including: 

                        Question: Text of the question. 

                        Options: List of possible answers (A-D). 

                        Right Answer: The correct answer from the options.

        ### BE COMPREHENSIVE IN YOUR RESPONSE.

        Consider the following context as your only source of information:

        {context}

        Answer:
        """
        generation_kwargs = {"max_new_tokens": 400, "temperature": 0.6,
                             "top_p": 0.9}  # Allow for a bit more length and randomness


    # Handling question scenario
    elif re.search(r'\bhi\b|\bhello\b', query_text_lower):
        template = """
        You are a friendly assistant. If greeted, greet the user back and introduce yourself.

        ### BE CONCISE IN YOUR RESPONSE, ANSWER ONLY WHAT IS ASKED.
        ### DO NOT REPEAT YOURSELF.
        ### DO NOT MAKE UP ANSWERS OR HALLUCINATE.

        user's query: '{question}'

        Answer:
        """
        generation_kwargs = {"max_new_tokens": 40, "temperature": 0.9,
                             "top_p": 0.9}  # Allow for a bit more length and randomness


    # Handling summarization scenario
    elif "summarize" in query_text_lower:
        template = """
        You are a helpful assistant. Your task is to summarize the following document. 
        The summary should be concise and clear, using only one or two paragraphs. 
        Title the response as "Summary".

        ### BE CONCISE IN YOUR RESPONSE, ANSWER ONLY WHAT IS ASKED.
        ### DO NOT REPEAT YOURSELF.
        ### DO NOT MAKE UP ANSWERS OR HALLUCINATE.


        user's query: '{question}'

        Consider the following context as your only source of information:

        {context}

        Answer:
        """
        generation_kwargs = {"max_new_tokens": 200, "temperature": 0.7,
                             "top_p": 0.9}  # Allow for a bit more length and randomness


    # Default to standard informative response
    else:
        template = """You are a helpful assistant. Your job is to answer questions based on the context provided from the uploaded document(s).

        Please follow these guidelines:
        1. Your task is to conversate with the user.
        2. If you don't know the answer, say "I don't know" without repeating it multiple times.
        3. Try to understand user's query and answer appropriately.

        ### BE CONCISE IN YOUR RESPONSE, ANSWER ONLY WHAT IS ASKED.
        ### DO NOT REPEAT YOURSELF.
        ### DO NOT MAKE UP ANSWERS OR HALLUCINATE.

        user's query: '{question}'


        Here is the context:

        {context}

        Answer:
        """
        generation_kwargs = {"max_new_tokens": 90, "temperature": 0.6,
                             "top_p": 0.9}  # Allow for a bit more length and randomness

    # # Create and return the PromptTemplate
    #     # Create and return the PromptTemplate and the generation kwargs
    # prompt = PromptTemplate(template=template, input_variables=["context", "question"])
    # return prompt, generation_kwargs

    return PromptTemplate(template=template, input_variables=["context", "question"])
    # return PromptTemplate(template=template, input_variables=["context", "question"])


################################################################################################################################################################## 

qa = None  # Global QA object


def index(request):
    return render(request, 'testing.html')


@csrf_exempt
def upload_file(request):
    print('upload------------------')
    if request.method == 'POST':
        uploaded_file = request.FILES.get('file')
        print(uploaded_file,'+++++upload_file')
        if not uploaded_file:
            return JsonResponse({'success': False, 'message': 'No file part'})

        if not uploaded_file.name.endswith('.txt'):
            return JsonResponse({'success': False, 'message': 'Only txt files are allowed'})

        file_path = os.path.join(settings.MEDIA_ROOT, uploaded_file.name)
        with open(file_path, 'wb+') as destination:
            for chunk in uploaded_file.chunks():
                destination.write(chunk)

        # Load the uploaded SRT file using SRTLoader
        loader = SRTLoader(file_path)
        print(loader,'+++++++++++loader')
        documents = loader.load()
        print(documents,'++++++++++=documents')

        # Split the documents into chunks
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        all_splits = text_splitter.split_documents(documents)

        # Embed the documents
        embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2",
                                           model_kwargs={"device": "cuda"})
        vectordb = Chroma.from_documents(documents=all_splits, embedding=embeddings, persist_directory="chroma_db")

        global qa
        retriever = vectordb.as_retriever()

        qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=retriever, verbose=True)
        print(qa,'++++++++++++qa')

        return JsonResponse({'success': True, 'file': uploaded_file.name,'message': 'Upload Successfully'})

    return JsonResponse({'success': False, 'message': 'Upload failed'})


from django.http import JsonResponse, HttpResponse
from time import time
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def query(request):
    print('----inside query----')
    if request.method == 'POST':
        query_text = request.POST.get('query')

        # if query_text.lower == 'hlo' or 'hi' or 'hello':
        #     return HttpResponse ('Hello, how can i assist you today')

        Prompt = f''' Prompt:
        Consider the above piece of information as your only source of information.
    
        Your main goal is to answer the user's query in the most appropriate way.
        User's query: '{query_text}'
    
        ### BE CONSIDERATE IN YOUR RESPONSE, ANSWER ONLY WHAT IS ASKED.
        ### YOUR RESPONSE MUST BE CONCISE AND TO THE POINT.
    
        - If the query contains a greeting (such as "hello", "hi", "hey", "good morning", "good evening"), greet the user and introduce yourself. Example response: "Hello! I'm here to assist you."
        
        - If the user asks for a summary, provide a summary with the title "Summary."
        
        - If the user asks for a course structure, follow this format:
    
            Program Name: [Name of the program]
    
            Program Description: [Description of the program]
    
            Courses: 
            - Course Name: [Name of the course]
              Course Description: [Description of the course]
              
              Chapters: 
              - Chapter Name: [Name of the chapter]
                Chapter Description: [Description of the chapter]
                
                Questions: 
                - Question: [Text of the question]
                  Options: 
                  A: [Option A]
                  B: [Option B]
                  C: [Option C]
                  D: [Option D]
                  Right Answer: [The correct answer]
                  
        - If the user asks for more courses, generate additional courses in the same structured format.

        - If the query involves code-related tasks or programming issues, provide a precise solution and example code.

        - Always ensure that the response is clear and free of unnecessary details.

        ### DO NOT REPEAT YOURSELF.
        ### PROVIDE RELEVANT CODE EXAMPLES WHERE NEEDED.
    '''
        print(query_text,'____________query_text')

        if not query_text or qa is None:
            print('111111111111111111111111111111')
            return HttpResponse('No documents are loaded. Please upload file first.')

        time_start = time()
        response = qa.run(query_text)
        response = str(response)
        match = response.split('Helpful Answer:')

        if len(match) > 1:
            extracted_text = match[1].strip()  # Extract text after 'Helpful Answer:' and remove any leading/trailing spaces
            print(extracted_text, '---------------- extracted_text')
        else:
            print("No 'Helpful Answer:' found in the response.")
            extracted_text = "No helpful answer found."

        time_end = time()
        print('222222222222222')
        total_time = f"{round(time_end - time_start, 3)} sec."
        print(response,'+++++++++response')

        total_time = f"{round(time_end - time_start, 3)} sec."
        return HttpResponse(extracted_text)

    return JsonResponse({'success': False, 'message': 'Invalid request'})
