$(document).ready(function () {
    $('#generateTokenForm').validate({
        rules: {
            keyname: {
                required: true,
                minlength: 2,
                maxlength: 50,
            },

        },
        messages: {
            keyname: {
                required: 'Please enter key name',
                minlength: 'Key name must be at least 2 characters',
                maxlength: 'Key name must be less than 50 characters',
            },
        },
        errorPlacement: function (error, element) {
            // Create the custom error container with the nested structure
            if (element.attr("name") === "role") {
                // If the element is the 'role' field, wrap the error inside a <div> within the <label>
                var errorContainer = $('<div>').addClass('custom-error').append(error);
                errorContainer.insertAfter(element.next(".select2-container"));
            }
            else {
            var customError = $([
                '<div class="fv-plugins-message-container invalid-feedback">',
                '<div data-field="' + element.attr("name") + '" data-validator="notEmpty">',
                '</div>',
                '</div>'
            ].join(""));

            // Append the error message to the nested custom error div
            error.appendTo(customError.find('div[data-field][data-validator]'));

            // Insert the custom error container after the input element
            customError.insertAfter(element);
        }
        },
        highlight: function (element) {
            // Add the 'is-invalid' class when there's an error
            $(element).addClass("is-invalid");
        },
        unhighlight: function (element) {
            // Remove the 'is-invalid' class when the field is valid
            $(element).removeClass("is-invalid");
        },
        submitHandler: function (form) {
        $(form).find(':submit').prop('disabled', true);
        var keyname = $('input[name="keyname"]').val();

        var csrf_token = $('input[name="csrfmiddlewaretoken"]').val();
        // Perform the AJAX request
        $.ajax({
          type: 'POST',
          url: "/generate_api_token/",
          data: { csrfmiddlewaretoken: csrf_token, keyname: keyname },
          success: function (data) {
            window.location.reload();
          },
          error: function (e) {
            console.log(e);
          }
        });
        }
    });

});
