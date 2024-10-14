$(document).ready(function(){

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const reason = urlParams.get('reason');
    console.log(reason, "reason");

    if (reason == 'max_chatbots_exceeded'){
        showInfoMessage('Please upgrade the subscription plan');
    } else if (reason == 'subscription_not_found' || reason == 'plan_not_found'){
        showInfoMessage("Please contact the adminstrator, couldn't find you subscription");
    } else if (reason == 'url_error'){
        showErrorMessage('Not a valid plan, please contact admin');
    } else if (reason == 'error'){
        showWarningMessage("Please contact the adminstrator, something went wrong");
    } else{
        console.log('check');
    }

        //  Sweet alert
          function showSuccessMessage(message) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: message,
                timer: 5000, // Time in milliseconds
                showConfirmButton: false,
            });
        }
  
        // Trigger a Warning Message
        function showWarningMessage(message) {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: message,
                timer: 5000, // Time in milliseconds
                showConfirmButton: false,
            });
        }
        // Trigger a Info Message
        function showInfoMessage(message) {
            Swal.fire({
                icon: 'info',
                title: 'Information',
                text: message,
                timer: 5000, // Time in milliseconds
                showConfirmButton: false,
            });
        }

        function showErrorMessage(message) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: message,
                timer: 5000, // Time in milliseconds
                showConfirmButton: false,
            });
        }
  
});