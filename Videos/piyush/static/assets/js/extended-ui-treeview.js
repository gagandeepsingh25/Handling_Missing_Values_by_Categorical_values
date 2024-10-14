

// One Drive Child Window
var child_window;
function OpenWindow(url_to_open, window_title) {
    // Specify the width and height for the new window
    var popupWinWidth = 600;
    var popupWinHeight = 600;

    // Calculate the left and top positions for centering
    var left = (window.innerWidth - popupWinWidth) / 2 + window.screenX;
    var top = (window.innerHeight - popupWinHeight) / 2 + window.screenY;

    // Open the new window with the calculated positions
    var new_window = window.open(
        url_to_open,
        window_title,
        'height=' + popupWinHeight + ',width=' + popupWinWidth +
        ',top=' + top + ',left=' + left +
        ',toolbar=no,menubar=no,scrollbars=no,status=no'
    );
    return new_window;
}

var connectOneDriveButton = document.getElementById('ConnectOneDriveModel');
  if (connectOneDriveButton) {
    connectOneDriveButton.addEventListener('click', function () {
        var chatbot_id = document.getElementById("chat_id").value;
        child_window = OpenWindow('/auth_microsoft_azure/'+chatbot_id, 'New Child Window');
    });
}


// Function to get checked box name
function getCheckedValues() {
    const checkedNodes = $('#jstree-checkbox').jstree('get_checked');
    const checkedValues = checkedNodes.map(function(nodeId) {
        const node = $('#jstree-checkbox').jstree(true).get_node(nodeId);
        return [node.data.value, node.data.name, node.data.type, node.data.path]; // You can access other properties like 'id' or 'data' if needed
    });
    return checkedValues;
}

// Function to send an AJAX POST request to the backend
        function sendAjaxRequest(checkedValues) {
              var display_id = document.getElementById('display_id').value;
              var code = document.getElementById('code').value;
              $("#getCheckedButton").attr('disabled', true);
              document.getElementById("getCheckedButton").innerHTML = 'Please Wait';
              $.ajax({
                url: '/add_one_drive',  // Replace with your actual backend URL
                type: 'POST',
                data: { checkedValues: checkedValues, code: code, display_id: display_id },  // Pass data
                headers: {
                  'X-CSRFToken': "{{csrf_token}}"  // Get the CSRF token value
                },
                success: function (response) {
                    console.log('AJAX request successful:', response);
                    // Handle the success response from the server
                    window.opener.location.reload()
                    window.close()
                },
                error: function (xhr, errmsg, err) {
                    // Handle any errors
                    console.log('AJAX request error:', errmsg, err, xhr);
                    document.getElementById("getCheckedButton").innerHTML = 'Submit';
                    const p_tag = document.getElementById("p_tag");
                    p_tag.textContent = "Error (501 Not Implemented): There is a server issue while getting your files.";
                }
              });
        }

// Function to get name & send AJAX
$('#getCheckedButton').click(function() {
    const checkedValues = getCheckedValues();
    console.log('Checked Values:', checkedValues);
    var p_tag = document.getElementById("p_tag");
    if (checkedValues.length === 0) {
        p_tag.textContent = "Please select at least on file/folder.";
        return;
     }
     else {
        p_tag.textContent = '';
     }
    // Send an AJAX request and close the window upon success
    sendAjaxRequest(checkedValues);

});