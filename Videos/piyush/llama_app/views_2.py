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






# Function to process .srt or .txt files and create the vector database
def process_files(file_paths):
    documents = []

    # Load each file based on its type
    for file_path in file_paths:
        if file_path.endswith('.srt'):
            loader = SRTLoader(file_path)
        elif file_path.endswith('.txt'):
            loader = TextLoader(file_path)
        else:
            print(f"Unsupported file type: {file_path}")
            continue

        # Load the document
        documents.extend(loader.load())

    # Split the documents into chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    all_splits = text_splitter.split_documents(documents)

    # Embed the documents
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2", model_kwargs={"device": "cuda"})
    vectordb = Chroma.from_documents(documents=all_splits, embedding=embeddings, persist_directory="chroma_db")

    # Set up the retriever
    retriever = vectordb.as_retriever()
    print("this is retriever......................................................................", retriever, "this is retriever......................................................................")

    # Initialize the RetrievalQA chain
    global qa_chain

    # Create the PromptTemplate object
    # PROMPT = PromptTemplate(
    #     template=custom_prompt, input_variables=["context", "question"]
    # )

    # Initialize the RetrievalQA chain with the custom prompt
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        verbose=True,
        # chain_type_kwargs={"prompt": PROMPT}
        chain_type_kwargs={"prompt": generate_prompt("default")}  # Placeholder until user input
    )

    print("Files processed and loaded into the vector database!")

def index(request):
    return render(request, 'testing.html')


@csrf_exempt
def upload_file(request):
    if request.method == 'POST':
        uploaded_file = request.FILES.get('file')
        if not uploaded_file:
            return JsonResponse({'success': False, 'message': 'No file part'})

        if not uploaded_file.name.endswith('.srt'):
            return JsonResponse({'success': False, 'message': 'Only SRT files are allowed'})

        file_path = os.path.join(settings.MEDIA_ROOT, uploaded_file.name)
        with open(file_path, 'wb+') as destination:
            for chunk in uploaded_file.chunks():
                destination.write(chunk)

        documents = []

        # Load each file based on its type
        for file_path in file_paths:             ##################################################due to colab
            if file_path.endswith('.srt'):
                loader = SRTLoader(file_path)
            elif file_path.endswith('.txt'):
                loader = TextLoader(file_path)
            else:
                print(f"Unsupported file type: {file_path}")
                continue

            # Load the document
            documents.extend(loader.load())

        # Split the documents into chunks
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        all_splits = text_splitter.split_documents(documents)

        # Embed the documents
        embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2",
                                           model_kwargs={"device": "cuda"})
        vectordb = Chroma.from_documents(documents=all_splits, embedding=embeddings, persist_directory="chroma_db")

        global qa
        retriever = vectordb.as_retriever()

        # qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=retriever, verbose=True)
        # Initialize the RetrievalQA chain with the custom prompt
        qa = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=retriever,
            verbose=True,
            # chain_type_kwargs={"prompt": PROMPT}
            chain_type_kwargs={"prompt": generate_prompt("default")}  # Placeholder until user input
        )

        print("Files processed and loaded into the vector database!")
        return JsonResponse({'success': True, 'file': uploaded_file.name})

    return JsonResponse({'success': False, 'message': 'Upload failed'})

##################################################################################################################################################################

# Modify the query_qa function to include the custom prompt
def query_qa(query_text):
    if qa_chain is None:
        print("No documents are loaded. Please upload files first.")
        return

    # # Combine the custom prompt with the user query
    # prompt_with_context = query_text
    # Get the prompt and generation kwargs based on the query
    # prompt, generation_kwargs = generate_prompt(query_text)

    # # Update the qa_chain's prompt with the dynamically generated PromptTemplate
    # qa_chain.combine_documents_chain.llm_chain.prompt = prompt

    # # Update the LLM's generation_kwargs
    # qa_chain.combine_documents_chain.llm_chain.llm.generation_kwargs = generation_kwargs

    # # Update the qa_chain's prompt with the dynamically generated PromptTemplate
    qa_chain.combine_documents_chain.llm_chain.prompt = generate_prompt(query_text)
    print("..................this is the prompt........................",
          qa_chain.combine_documents_chain.llm_chain.prompt,
          "..................this is the prompt........................")

    # Run the query
    response = qa_chain.run(query_text)

    # print(response, "..........................response text.....actual.......................................")

    # Check if the response follows the course generation structure
    if "program name:" in response.lower() and "course name:" in response.lower():
        # This is a structured course generation, return the full response
        answer_index = response.lower().find("answer:")
        response = response[answer_index + len("answer:"):].strip()

        # return response.strip()
        return response

    # Otherwise, treat it as a normal Q&A and extract only the first "Answer:"
    answer_index = response.lower().find("answer:")
    if answer_index != -1:
        # Find the next occurrence of "Answer:" or any other delimiter that indicates the end of the first answer
        next_answer_index = response.lower().find("answer:", answer_index + 1)

        if next_answer_index != -1:
            # Return only the content between the first "Answer:" and the next occurrence of "Answer:"
            response = response[answer_index:next_answer_index].strip()
        else:
            # If there's no second "Answer:", return everything after the first "Answer:"
            response = response[answer_index:].strip()

    return response


@csrf_exempt
def query(request):
    if request.method == 'POST':
        query_text = request.POST.get('query')
        if query_text.lower() == "exit":
            print("Exiting the chatbot...")

            return JsonResponse({'success': False, 'message': 'exit'})

        time_start = time()
        response = query_qa(query_text)
        print("Bot:", response)
        time_end = time()

        total_time = f"{round(time_end - time_start, 3)} sec."
        return JsonResponse({'success': True, 'response': response, 'time': total_time})

    return JsonResponse({'success': False, 'message': 'Invalid request'})


############################################################################################################################  set this

# Step 1: Upload files (.srt/.txt)
def upload_files():
    uploaded = files.upload()  # Upload files using Google Colab's upload widget
    file_paths = list(uploaded.keys())  # Get the list of file names
    process_files(file_paths)  # Process and load the files into the vector database

# # Step 2: Continuous chatbot interaction
# def chatbot():
#     print("Chatbot is ready! Type your queries and interact with the documents.")
#     while True:
#         query_text = input("You: ")
#         if query_text.lower() == "exit":
#             print("Exiting the chatbot...")
#             break
#         response = query_qa(query_text)
#         print("Bot:", response)

# Usage
upload_files()  # Upload and process the files.......................................call this function to upload file
# chatbot()  # Start the chatbot



