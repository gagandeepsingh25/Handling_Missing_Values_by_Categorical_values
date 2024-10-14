/**
 * File Upload
 */

'use strict';

(function () {
  // previewTemplate: Updated Dropzone default previewTemplate
  // ! Don't change it unless you really know what you are doing
  const previewTemplate = `<div class="dz-preview dz-file-preview">
    <div class="dz-details">
      <div class="dz-thumbnail">
        <img data-dz-thumbnail>
        <span class="dz-nopreview" data-dz-name></span>
        <div class="dz-success-mark"></div>
        <div class="dz-error-mark"></div>
        <div class="dz-error-message"><span data-dz-errormessage></span></div>
        <div class="progress m-2">
          <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
        </div>
      </div>
      <div class="dz-filename" data-dz-name></div>
      <div class="dz-size" data-dz-size></div>
    </div>
  </div>`;

const dropzoneSingle = document.querySelector('#dropzone-multi'); // Change the ID to match your single file upload element
if (dropzoneSingle) {
    const myDropzoneSingle = new Dropzone(dropzoneSingle, {
      previewTemplate: previewTemplate,
      uploadMultiple: false, // Set to false for single file upload
      parallelUploads: 1, // Set to 1 for single file upload
      maxFilesize: 100,
      addRemoveLinks: true,
      autoProcessQueue: false, // Disable auto upload
      acceptedFiles: ".csv" // Change to the allowed file types you need
    });

    // Add a success event listener to refresh the page after the file is uploaded
    myDropzoneSingle.on("success", function (file, response) {
      location.reload(); // Refresh the page after the file is uploaded
    });

    // Add an error event listener to display an error message if the file fails to upload
    myDropzoneSingle.on("error", function (file, errorMessage, xhr) {
        console.log(file, "-----", errorMessage, "-----", xhr)
      Swal.fire('Error', 'An error occurred while uploading the file. Make sure your Vault or uploaded CSV file is not empty.', 'error');
    });

    const submitUploadButton = document.querySelector('#submit-upload'); // Change the ID to match your submit button
    if (submitUploadButton) {
      submitUploadButton.addEventListener('click', function () {
        const files = myDropzoneSingle.getQueuedFiles();
        if (files.length === 1) {
          Swal.fire({
            title: 'Confirm Upload',
            text: 'Are you sure you want to upload the selected file?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Upload',
            cancelButtonText: 'Cancel',
            customClass: {
              cancelButton: 'swal2-cancel btn btn-label-danger',
              confirmButton: 'swal2-confirm btn btn-primary px-5',
              denyButton: 'd-none',
            }
          }).then((result) => {
            if (result.isConfirmed) {
              myDropzoneSingle.processQueue(function () {
                dropzoneSingle.submit(); // Submit the form after the file is uploaded
                Swal.fire('Successfully File Uploaded.', 'success');
              });
            }
          });
        } else {
          Swal.fire({
            title: 'No File or Too Many Files',
            text: 'Please add a single file to upload.',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Back',
            customClass: {
              cancelButton: 'swal2-cancel btn btn-label-info',
              confirmButton: 'd-none',
              denyButton: 'd-none',
            }
          });
        }
      });
    }
  }
})();

