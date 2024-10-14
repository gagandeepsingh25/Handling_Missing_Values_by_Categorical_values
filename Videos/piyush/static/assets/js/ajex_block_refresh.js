// checkboxes click script
var checkboxStates = {};
// Function to save checkbox states
function saveCheckboxStates() {
    const checkboxes = document.querySelectorAll('.email-list-item-input');
    checkboxStates = {};

    checkboxes.forEach(checkbox => {
      checkboxStates[checkbox.id] = checkbox.checked;
    });
    // Check the 'email-select-all' checkbox if it was checked before refresh
    const emailSelectAllCheckbox = document.getElementById('email-select-all');
    checkboxStates[emailSelectAllCheckbox.id] = emailSelectAllCheckbox.checked;
}
// Function to restore checkbox states
function restoreCheckboxStates() {
    if (checkboxStates) {
        for (const checkboxId in checkboxStates) {
            if (checkboxStates.hasOwnProperty(checkboxId)) {
                const checkbox = document.getElementById(checkboxId);
                if (checkbox) {
                    checkbox.checked = checkboxStates[checkboxId];
                }
            }
        }
    }
}

//doc
if (document.getElementById("div_for_refresh_doc")) {
    $(document).ready(function(){
    setInterval(function(){
        saveCheckboxStates();
        var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

        $.ajax({
            type: "GET",
            url : "/refresh_div/",
            headers:{
                'X-CSRFToken' : csrftoken
            },
            data: {},
            success: function(response){

            $("#div_for_refresh_doc").html(response);
            $('[data-bs-toggle="tooltip"]').tooltip();
            restoreCheckboxStates();
            },
            error: function(response){
            console.log("An error occured-----------------------")
                //alert('An error occured')
            }
        });
    },10000);
    })
}

//url
if (document.getElementById("div_for_refresh_url")) {
    $(document).ready(function(){
    setInterval(function(){
        saveCheckboxStates();
        var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

        $.ajax({
            type: "GET",
            url : "/refresh_url/",
            headers:{
                'X-CSRFToken' : csrftoken
            },
            data: { },
            success: function(response){

            $("#div_for_refresh_url").html(response);
            $('[data-bs-toggle="tooltip"]').tooltip();
            restoreCheckboxStates();
            },
            error: function(response){
            console.log(response, "An error occured-----------------------")
                //alert('An error occured')
            }
        });
    },10000);
    })
}

// chat history
if (document.getElementById("chat-history-ul")) {
    $(document).ready(function(){
    setInterval(function(){
        saveCheckboxStates();
        var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

        $.ajax({
            type: "GET",
            url : "/refresh_chat_history/",
            headers:{
                'X-CSRFToken' : csrftoken
            },
            data: { },
            success: function(response){

            $("#chat-history-ul").html(response);
            $('[data-bs-toggle="tooltip"]').tooltip();
            restoreCheckboxStates();
            },
            error: function(response){
            console.log(response, "An error occured-----------------------")
                //alert('An error occured')
            }
        });
    },1000);
    })
}