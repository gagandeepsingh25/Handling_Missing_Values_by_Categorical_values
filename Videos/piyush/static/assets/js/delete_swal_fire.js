   
   
   $('.delete-item').on('click', function () {
        const itemId = $(this).data('item-id');
        const itemType = $(this).data('item-type');

        // Show the confirmation dialog using SweetAlert
        Swal.fire({
            title: 'Delete Confirmation',
            text: `Are you sure you want to delete ?`,
            icon: 'warning',
            showDenyButton: true,
            showCancelButton: true,
            customClass: {
                cancelButton: 'swal2-cancel btn btn-label-danger',
                confirmButton: 'swal2-confirm btn btn-primary px-5',
                denyButton: 'd-none',
            }
        }).then((confirmed) => {
            if (confirmed.isConfirmed) {
                var ChatId = $(this).data('item-id');
                var url = $("#domain").val()
                switch (itemType) {
                    case 'delete-document':
                        //$.post(url+'/delete_document/' + itemId, function(response) { console.log(response); success_delete(); })
                        // .fail(function(error) { error_delete(); });
                        $(location).attr('href', "/delete_document/" + itemId);
                        break;
                    case 'delete-api-key':
                        $(location).attr('href', "/api/delete-api-key/" + itemId + "/");
                        break;
                    case 'delete-user':
                        $(location).attr('href', "/delete-user/" + itemId);
                        break;
                    case 'delete-url':
                        $(location).attr('href', "/delete_website/" + itemId);
                        break;
                    case 'delete-qa':
                        $(location).attr('href', "/delete_qa/" + itemId);
                        break;
                    case 'delete-text':
                        $(location).attr('href', "/delete_text/" + itemId);
                        break;
                    default:
                        break;
                }
            }
        });
    });


   $('.active-deactivate-item').on('click', function () {
        const itemId = $(this).data('item-id');
        const itemType = $(this).data('item-type');

        // Show the confirmation dialog using SweetAlert
        Swal.fire({
            title: 'Change status',
            text: 'Change user status to ' + itemType + "?",
            icon: 'warning',
            showDenyButton: true,
            showCancelButton: true,
            customClass: {
                cancelButton: 'swal2-cancel btn btn-label-danger',
                confirmButton: 'swal2-confirm btn btn-primary px-5',
                denyButton: 'd-none',
            }
        }).then((confirmed) => {
            if (confirmed.isConfirmed) {
                var ChatId = $(this).data('item-id');
                var url = $("#domain").val()
                switch (itemType) {
                    case 'activate':
                        $(location).attr('href', `/change-user-status/${itemId}/${itemType}`);
                        break;
                    case 'deactivate':
                        $(location).attr('href', `/change-user-status/${itemId}/${itemType}`);
                        break;
                    case 'normal':
                        $(location).attr('href', `/change-user-status/${itemId}/${itemType}`);
                        break;
                    case 'training':
                        $(location).attr('href', `/change-user-status/${itemId}/${itemType}`);
                        break;
                    default:
                        break;
                }
            }
        });
   })

function success_delete(){
    Swal.fire({
        title: 'Deleted',
        text: `File deleted successfully.`,
        icon: 'success',
        timer:2000,
        customClass: {
            cancelButton: 'd-none',
            confirmButton: 'd-none',
            denyButton: 'd-none',
        }
    })
}
function error_delete(){
    Swal.fire({
        title: 'Something went wrong',
        text: `Unable to delete the file, please try again.`,
        icon: 'error',
        timer: 2000,
        customClass: {
            cancelButton: 'd-none',
            confirmButton: 'd-none',
            denyButton: 'd-none',
        }
    })
}
    