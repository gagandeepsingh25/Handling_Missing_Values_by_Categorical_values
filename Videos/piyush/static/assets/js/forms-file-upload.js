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
    <span class="dz-nopreview">No preview</span>
    <div class="dz-success-mark"></div>
    <div class="dz-error-mark"></div>
    <div class="dz-error-message"><span data-dz-errormessage></span></div>
    <div class="progress">
      <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
    </div>
  </div>
  <div class="dz-filename" data-dz-name></div>
  <div class="dz-size" data-dz-size></div>
</div>
</div>`;

    // ? Start your code from here

    // Basic Dropzone
    // --------------------------------------------------------------------
    const dropzoneBasic = document.querySelector('#dropzone-basic');
    if (dropzoneBasic) {
        const myDropzone = new Dropzone(dropzoneBasic, {
            previewTemplate: previewTemplate,
            parallelUploads: 5,
            maxFilesize: 50,
            addRemoveLinks: true,
            maxFiles: 10
        });
    }

    const dropzoneMulti = document.querySelector('#dropzone-multi');
    if (dropzoneMulti) {
        const myDropzoneMulti = new Dropzone(dropzoneMulti, {
            previewTemplate: previewTemplate,
            uploadMultiple: true,
            parallelUploads: 25,
            maxFilesize: 100,
            addRemoveLinks: true,
            autoProcessQueue: false, // Disable auto upload
            maxFiles: 25,
            acceptedFiles: ".pdf, .docx, .doc"
        });

        // Add a success event listener to refresh the page after all files are uploaded
        myDropzoneMulti.on("success", function (file, response) {
            if (myDropzoneMulti.getQueuedFiles().length === 0 && myDropzoneMulti.getUploadingFiles().length === 0) {
                location.reload();
                var baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                window.location.href = baseUrl;
            }
        });

        // Add an error event listener to display an error message if any files fail to upload
        myDropzoneMulti.on("error", function (file, errorMessage, xhr) {
            Swal.fire({
                title: 'File Size Exceeded',
                text: 'Some files exceed the maximum file size limit of 100 MB.',
                icon: 'error',
                showCancelButton: true,
                reverseButtons: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Remove',
                customClass: {
                    confirmButton: 'swal2-confirm btn btn-primary px-5',
                    cancelButton: 'swal2-cancel btn btn-label-secondary',
                    denyButton: 'd-none',
                }
            }).then((result) => {
                console.log(result);
                if (result.isConfirmed) {
                    // Remove the file from the Dropzone
                    myDropzoneMulti.removeFile(file);
                }
            });;

        });

        const submitUploadButton = document.querySelector('#submit-upload');
        if (submitUploadButton) {
            submitUploadButton.addEventListener('click', function () {
                const files = myDropzoneMulti.getQueuedFiles();

                // Calculate total size of all files
                const totalSize = files.reduce((acc, file) => acc + file.size, 0);

                // Check if the total size is below or equal to 100 MB
                if (totalSize > 100 * 1024 * 1024) {
                    Swal.fire({
                        title: 'File Size Exceeded',
                        text: 'The total size of all files exceeds the maximum allowed size (100 MB). Please remove some files before submitting',
                        icon: 'warning',
                        showCancelButton: true,
                        reverseButtons: true,
                        confirmButtonText: 'Okay',
                        cancelButtonText: 'Cancel',
                        customClass: {
                            cancelButton: 'd-none',
                            confirmButton: 'swal2-confirm btn btn-primary px-5',
                            denyButton: 'd-none',
                        }
                    })
                } else if (files.length > 25) {
                    Swal.fire({
                        title: 'File Limit Exceeded',
                        text: 'You can only upload a maximum of 25 files at a time. Please remove some files before submitting.',
                        icon: 'warning',
                        confirmButtonText: 'Okay',
                        customClass: {
                            confirmButton: 'swal2-confirm btn btn-primary px-5',
                        }
                    });
                } else if (files.length > 0) {
                    Swal.fire({
                        title: 'Confirm Upload',
                        text: 'Are you sure you want to upload the selected files?',
                        icon: 'question',
                        showCancelButton: true,
                        cancelButtonText: 'Cancel',
                        confirmButtonText: 'Upload',
                        reverseButtons: true,
                        customClass: {
                            confirmButton: 'swal2-confirm btn btn-primary px-5',
                            denyButton: 'd-none',
                            cancelButton: 'swal2-cancel btn btn-label-secondary float-start',
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            myDropzoneMulti.processQueue(function () {
                                dropzoneMulti.submit(); // Submit the form after all files are uploaded
                                // Swal.fire('Successfully File Uploaded.', 'success');
                                // var baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                                // window.location.href = baseUrl;
                            });
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'No Files',
                        text: 'Please add files to upload.',
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
