$(document).ready(function () {
    jQuery.validator.addMethod("noSpace", function (value, element) {
        return value.indexOf(" ") < 0 && value != "";
    }, "No space please and don't leave it empty");

    jQuery.validator.addMethod("alphabetic_chars", function (value, element) {
        var regex = /^[a-zA-Z]+$/;  // Updated regex to allow only alphabetic characters
        var key = value;

        if (!regex.test(key)) {
            return false;
        }
        return true;
    }, "Please use only alphabetic characters");

    $('#registerform').validate({
        rules: {
            username: {
                required: true,
                minlength: 2,
                maxlength: 50,
                noSpace: true,
                alphabetic_chars: true,
            },
            email: {
                required: true,
                email: true
            },
            terms: {
                required: true,
            },
            role: {
                required: true,
            },
            plan: {
                required: true,
            },
        },
        messages: {
            username: {
                required: 'Please enter first name',
                minlength: 'First name must be at least 2 characters',
                maxlength: 'First name must be less than 50 characters',
            },
            email: {
                required: 'Please enter your email',
                email: 'Please enter a valid email address',
            },
            terms: {
                required: 'Please agree terms & conditions',
            },
            role: {
                required: 'Please select any one of the role',
            },
            plan: {
                required: 'Please enter your plan',
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
            form.submit();
        }
    });

});
