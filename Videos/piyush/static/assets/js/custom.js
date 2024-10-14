// alert("alert");
document.querySelector(".sideNav-toggle").addEventListener("click", function() {
    document.querySelector(".sideNav-wrap").classList.toggle("collapse-div");
    document.querySelector(".content-wrap").classList.toggle("collapse-div");
});

document.querySelector(".content-toggle").addEventListener("click", function() {
    document.querySelector(".sideNav-wrap").classList.toggle("collapse-div");
    document.querySelector(".content-wrap").classList.toggle("collapse-div");
});


const textarea = document.getElementById('autoResizeTextarea');
// Function to adjust height
function adjustTextareaHeight(textarea) {
    // Reset the height to calculate new scrollHeight
    textarea.style.height = '40px';  // Always reset to 50px for a single line

    // Check if the scrollHeight is greater than 50px (indicating more than one line)
    if (textarea.scrollHeight > 40) {
        // Adjust the height dynamically based on content
        textarea.style.height = textarea.scrollHeight + 'px';
    }
}
// Event listener for 'input' event (detects typing and content change)
textarea.addEventListener('input', function () {
    adjustTextareaHeight(this);
});