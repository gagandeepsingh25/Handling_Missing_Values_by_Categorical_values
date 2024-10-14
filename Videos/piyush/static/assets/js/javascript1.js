    // Scroll to a specific y-coordinate (vertical position) on the page
    function scrollToPosition(yCoordinate) {
      window.scrollTo({
        top: yCoordinate,
        behavior: 'smooth' // You can use 'auto' or 'smooth' for animation
      });
    }

    // Example: Scroll to the bottom of the page
    function scrollToBottom() {
      scrollToPosition(document.body.scrollHeight);
    }

    // Example: Scroll to a specific element on the page by its ID
    function scrollToElement(elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
             function showLoader() {

    appendChatbotResponse("Thinking...");
    };

    function hideLoader() {
        var elements = document.getElementsByClassName("w-full text-token-text-primary");
        elements[elements.length-1].textContent ="" ;

    };
    var keyPressCount = 0;
    var xhr; // Store the XMLHttpRequest object globally
    var responseCount = 0; // Counter for the number of responses generated
    var responses = [];

    document.getElementById('prompt-textarea').addEventListener('keypress', function(event) {
        keyPressCount++;
        if (keyPressCount === 1) {
            handleKeyPress(event);
            keyPressCount = 0;
        }
    });

    document.getElementById('userInputForm').addEventListener('submit', handleSubmit);

    function handleKeyPress(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            sendMessage();
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        sendMessage();
    }

    document.getElementById('send-button').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get the user input
        var userInput = document.getElementById("prompt-textarea").value.trim();

        if (userInput !== "") {
            sendMessage(); // Send the message if there's input
        }
    });

    function sendMessage() {
        var centered_container = document.getElementById("centered-container");
        centered_container.innerHTML = "";
        var userInput = document.getElementById("prompt-textarea").value.trim();

        // Check if userInput is empty and if the button clicked is send-button
        if (userInput === "" && event.target.id === "send-button") {
            alert("Please fill in this field.");
            return; // Stop further execution if userInput is empty and send-button is clicked
        }

        createUserChatElement(userInput);
        showLoader();

        document.getElementById("prompt-textarea").value = "";


        responseCount = 0; // Reset response count
        responses = []; // Clear previous responses
        var chatContainer = document.getElementById("chat-container");
        xhr = new XMLHttpRequest();
        xhr.open("POST", "/chatbot", true);
        console.log('chatbot---------texttexttexttext---------');
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 3 && xhr.status === 200) {
                hideLoader();
                var response = xhr.responseText;
                console.log(response,'+response+++response+++++response++++');
                appendChatbotResponse(response);
                responses.push(response);
                responseCount++; // Increment response count
            } else if (xhr.readyState === 4 && xhr.status === 200) {
                hideLoader();
                var response = xhr.responseText;
                appendChatbotResponse(response);
                responses.push(response);
                responseCount++; // Increment response count for the final response
            }
        };

        xhr.send(encodeURI("query=" + userInput));
        console.log('+++++++++++++++++++++++++++query==================================');
    }

      function createUserChatElement(text) {

        const chatContainer = document.getElementById("chat-container");

        // Create main div
        const mainDiv = document.createElement('div');
        mainDiv.className = 'w-full text-token-text-primary';
        mainDiv.style = '--avatar-color: #19c37d;';
        const innerDiv1 = document.createElement('div');
        innerDiv1.className = 'px-4 py-2 justify-center text-base md:gap-6 m-auto';
        const innerDiv2 = document.createElement('div');
        innerDiv2.className = 'flex flex-1 text-base mx-auto gap-3 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl group';


        // create a div for You message
        const innerDiv3 = document.createElement('div');
        innerDiv3.className = 'flex-shrink-0 flex flex-col relative items-end';
        const innerDiv4 = document.createElement('div');
        innerDiv4.className = 'gizmo-shadow-stroke flex h-6 w-6 items-center justify-center overflow-hidden rounded-full';
        const innerDiv5 = document.createElement('div');
        innerDiv5.className = 'relative flex';
        const innerImg = document.createElement('img');
        innerImg.setAttribute('width', '24');
        innerImg.setAttribute('height', '24');
        innerImg.setAttribute('src', 'static/assets/img/main_img/ga.png');
        innerImg.style = 'color: transparent;';


        // create a div for Text message
        const secondInnerDiv1 = document.createElement('div');
        secondInnerDiv1.className = 'relative flex w-full flex-col';
        const secondInnerDiv2 = document.createElement('div');
        secondInnerDiv2.className = 'font-semibold select-none';
        secondInnerDiv2.textContent  = 'You';
        const secondInnerDiv3 = document.createElement('div');
        secondInnerDiv3.className = 'flex-col gap-1 md:gap-3';
        const secondInnerDiv4 = document.createElement('div');
        secondInnerDiv4.className = 'flex flex-grow flex-col max-w-full';
        const secondInnerDiv5 = document.createElement('div');
        secondInnerDiv5.className = 'min-h-[20px] text-message flex flex-col items-start gap-3 whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 overflow-x-auto';
        const secondInnerDiv6 = document.createElement('div');
        secondInnerDiv6.textContent  = text;


        // append you message in outer div
        innerDiv5.appendChild(innerImg);
        innerDiv4.appendChild(innerDiv5);
        innerDiv3.appendChild(innerDiv4);
        innerDiv2.appendChild(innerDiv3);


        // append text message in outer div
        secondInnerDiv5.appendChild(secondInnerDiv6);
        secondInnerDiv4.appendChild(secondInnerDiv5);
        secondInnerDiv3.appendChild(secondInnerDiv4);
        secondInnerDiv1.appendChild(secondInnerDiv2);
        secondInnerDiv1.appendChild(secondInnerDiv3);
        innerDiv2.appendChild(secondInnerDiv1);

        innerDiv1.appendChild(innerDiv2);
        mainDiv.appendChild(innerDiv1);

        // Append elements to build the structure
        chatContainer.appendChild(mainDiv);

        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
//   this function gives response   <<<< ------------------------
function appendChatbotResponse(responseList) {
console.log(responseList,'aaaaaaaaa')
    const chatContainer = document.getElementById("chat-container");
    const mainDiv = document.createElement('div');
    mainDiv.className = 'w-full text-token-text-primary';
    mainDiv.style = '--avatar-color: #19c37d;';
    const innerDiv1 = document.createElement('div');
    innerDiv1.className = 'px-4 py-2 justify-center text-base md:gap-6 m-auto';
    const innerDiv2 = document.createElement('div');
    innerDiv2.className = 'flex flex-1 text-base mx-auto gap-3 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl group';

    // create a div for You message
    const innerDiv3 = document.createElement('div');
    innerDiv3.className = 'flex-shrink-0 flex flex-col relative items-end';
    const innerDiv4 = document.createElement('div');
    innerDiv4.className = 'gizmo-shadow-stroke flex h-6 w-6 items-center justify-center overflow-hidden rounded-full';
    const innerDiv5 = document.createElement('div');
    innerDiv5.className = 'relative flex';
    const innerImg = document.createElement('img');
    innerImg.setAttribute('width', '24');
    innerImg.setAttribute('height', '24');
    innerImg.setAttribute('src', 'https://img.freepik.com/premium-vector/sa-letter-logo-design-black-background-initial-monogram-letter-sa-logo-design-vector-template_634196-1071.jpg');
    innerImg.style = 'color: transparent;';

    // create a div for Text message
    const secondInnerDiv1 = document.createElement('div');
    secondInnerDiv1.className = 'relative flex w-full flex-col';
    const secondInnerDiv2 = document.createElement('div');
    secondInnerDiv2.className = 'font-semibold select-none';
    secondInnerDiv2.textContent  = 'Demo';
    const secondInnerDiv3 = document.createElement('div');
    secondInnerDiv3.className = 'flex-col gap-1 md:gap-3';
    const secondInnerDiv4 = document.createElement('div');
    secondInnerDiv4.className = 'flex flex-grow flex-col max-w-full';
    const secondInnerDiv5 = document.createElement('div');
    secondInnerDiv5.className = 'min-h-[20px] text-message flex flex-col items-start gap-3 whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 overflow-x-auto';
        const innerSecondDiv6_0 = document.createElement('div');
        innerSecondDiv6_0.className = 'markdown prose w-full break-words dark:prose-invert light';
    if (responseList==="Thinking..."){
            const innerSecondDiv7 = document.createElement('div');
            innerSecondDiv7.className='button-loader';
            let loaderDiv1 = document.createElement('div');
            let loaderDiv2 = document.createElement('div');
            let loaderDiv3 = document.createElement('div');
            innerSecondDiv7.appendChild(loaderDiv1)
            innerSecondDiv7.appendChild(loaderDiv2)
            innerSecondDiv7.appendChild(loaderDiv3)

             innerSecondDiv6_0.appendChild(innerSecondDiv7)
            innerDiv2.appendChild(secondInnerDiv1)
            secondInnerDiv1.appendChild(secondInnerDiv2)
            secondInnerDiv1.appendChild(secondInnerDiv3)
            secondInnerDiv3.appendChild(secondInnerDiv4)
            secondInnerDiv4.appendChild(secondInnerDiv5)
            secondInnerDiv5.appendChild(innerSecondDiv6_0)

    }else{

        // Split responseList by code blocks
        const codeBlocks = responseList.split("```");

        // Iterate through the code blocks and text
        for (const block of codeBlocks) {
            if (block.startsWith("solidity") || block.startsWith("javascript")|| block.startsWith("python")|| block.startsWith("html")|| block.startsWith("ruby")|| block.startsWith("c")|| block.startsWith("c++")|| block.startsWith("bash")|| block.startsWith("java")|| block.startsWith("xml") || block.endsWith("```")) {
               const containerDiv_ = document.createElement('pre');
               containerDiv_.style.BackgroundColor = "black";

                const containerDiv6 = document.createElement('div');
                containerDiv6.className = 'dark bg-gray-950 rounded-md';
                containerDiv6.style.width="700px";
                containerDiv6.style.BackgroundColor = "black";

                    const containerDiv7 = document.createElement('div');
                        containerDiv7.className = 'flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md';
                        const containerDiv8 = document.createElement('span');
                        containerDiv8.textContent = "solidity";
                        const containerDiv9 = document.createElement('span');
                         containerDiv9.style.display = 'flex';

                            const containerDiv10 = document.createElement('button');
                            containerDiv10.className = 'flex gap-1 items-center';
                                const containerDivIcon = document.createElement('i');

                                const buttonIcon = document.createElement('i');
                                buttonIcon.className = 'fa-regular fa-clipboard';

                                                        // Create the "Copy Code" button text
                                const buttonText = document.createElement('span');
                                buttonText.textContent = ' Copy code';
                                const containerDiv11 = document.createElement('span');
                                 const copyCodeButton = document.createElement('button');
                                copyCodeButton.className = 'flex gap-1 items-center copy-code';
                                copyCodeButton.addEventListener('click', async (event) => {
                                const copyCodeButton = event.currentTarget;
                                const copyCodeElement = copyCodeButton.closest('.dark.bg-gray-950').querySelector('.p-4.overflow-y-auto');
                                const unsecuredCopyToClipboard = (text) => { const textArea = document.createElement("textarea"); textArea.value=text; document.body.appendChild(textArea); textArea.focus();textArea.select(); try{document.execCommand('copy')}catch(err){console.error('Unable to copy to clipboard',err)}document.body.removeChild(textArea)};

                                if (copyCodeElement) {
                                    const copyCodeText = copyCodeElement.textContent || copyCodeElement.innerText;
                                    console.log('+++++++++++++++++++++++++++')
                                     if (window.isSecureContext && navigator.clipboard) {
                                        await navigator.clipboard.writeText(copyCodeText);
                                      } else {
                                        unsecuredCopyToClipboard(copyCodeText);
                                      }
                                    console.log(copyCodeText ,'--------------------------copyCodeText')
                                    buttonText.textContent = "Copied";
                                    buttonIcon.className = "fa-solid fa-check";

                                    setTimeout(() => {
                                        buttonText.textContent = "Copy code";
                                        buttonIcon.className = 'fa-regular fa-clipboard';
                                    }, 2000);
                                }
                            });

                                copyCodeButton.appendChild(buttonIcon);
                                copyCodeButton.appendChild(buttonText);
                            containerDiv9.appendChild(copyCodeButton);


                    const containerDiv7_ = document.createElement('div');
                        containerDiv7_.className = "p-4 overflow-y-auto"
                        containerDiv7_.style.BackgroundColor="black";
                        secondInnerDiv5.appendChild(innerSecondDiv6_0)
                        innerSecondDiv6_0.appendChild(containerDiv_)
                        containerDiv_.appendChild(containerDiv6)
                        containerDiv6.appendChild(containerDiv7)
                        containerDiv7.appendChild(containerDiv8)
                        containerDiv7.appendChild(containerDiv9)
                        containerDiv9.appendChild(containerDiv10)
                        containerDiv10.appendChild(containerDivIcon)
                        containerDiv10.appendChild(containerDiv11)
                        const codesetction = document.createElement('code');
                        codesetction.classList.add('!whitespace-pre', 'hljs', 'language-html');
                        codesetction.style.color = 'white';
                        containerDiv6.appendChild(containerDiv7_)
                        containerDiv7_.appendChild(codesetction)
                        codesetction.textContent = removeStartingSolidity(block.slice(3, -3));
            }

            else {
                // Text block
                const containerDiv_ = document.createElement('p');
                var text = boldTextBetweenDoubleAsterisks(block);
                //const textNode = document.createTextNode(text);
                containerDiv_.innerHTML = text;
                console.log(text,'----------------text');
                secondInnerDiv5.appendChild(innerSecondDiv6_0);
                innerSecondDiv6_0.appendChild(containerDiv_);
            }
        }
    }

    // append you message in outer div
    innerDiv5.appendChild(innerImg);
    innerDiv4.appendChild(innerDiv5);
    innerDiv3.appendChild(innerDiv4);
    innerDiv2.appendChild(innerDiv3);

    // append text message in outer div
    secondInnerDiv4.appendChild(secondInnerDiv5);
    secondInnerDiv3.appendChild(secondInnerDiv4);
    secondInnerDiv1.appendChild(secondInnerDiv2);
    secondInnerDiv1.appendChild(secondInnerDiv3);
    innerDiv2.appendChild(secondInnerDiv1);

    innerDiv1.appendChild(innerDiv2);
    mainDiv.appendChild(innerDiv1);

    console.log(responseList,'defghyhfgjtkjfgjht');

    // Scroll to the bottom of the chat container
    // Append elements to build the structure
    chatContainer.appendChild(mainDiv);

    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function boldTextBetweenDoubleAsterisks(text) {
    // Define the regular expression pattern to match lines starting with "###" or text between pairs of "**"
    var pattern = /^(###.*$)|\*\*(.*?)\*\*/gm;
    // Use replace() with a callback function to replace the matches with bold text
    var result = text.replace(pattern, function(match, group1, group2) {
        if (group1) {
            // If the line starts with "###", remove "###" and make the entire line bold
            return '<b>' + group1.replace(/^###\s*/, '') + '</b>';
        } else {
            // Otherwise, make the text between "**" bold
            return '<b>' + group2 + '</b>';
        }
    });
    return result;
}


function removeStartingSolidity(inputString) {
    if (inputString.startsWith("idity")) {
        return inputString.slice("idity".length);
    } else if (inputString.startsWith("ascript")) {
        return inputString.slice("ascript".length);
    } else if (inputString.startsWith("on")) {
        return inputString.slice("on".length);
    } else if (inputString.startsWith("hon")) {
        return inputString.slice("hon".length);
    } else if (inputString.startsWith("h")) {
        return inputString.slice("h".length);
    } else if (inputString.startsWith("l")) {
        return inputString.slice("l".length);
    } else if (inputString.startsWith("a")) {
        return inputString.slice("a".length);
    } else if (inputString.startsWith("y")) {
        return inputString.slice("y".length);
    } else {
        return inputString;
    }
}


// Function to handle SSE
function initSSE() {
  const eventSource = new EventSource('/stream');

  eventSource.onmessage = (event) => {
    const response = JSON.parse(event.data);
    // Handle the received message, e.g., append it to the chat interface
    appendChatbotResponse(response);
  };

  eventSource.onerror = (error) => {
    console.error('EventSource failed:', error);
    eventSource.close();
  };
}

// Call initSSE to start listening for streaming responses
//initSSE();
