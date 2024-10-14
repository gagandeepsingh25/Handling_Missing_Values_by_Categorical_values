$(document).ready(function () {
    $('#qa-form').validate({
        rules: {
            question: {
                required: true,
                minlength: 5,
                maxlength: 255,
            },
            answer: {
                required: true,
                minlength: 5,
                maxlength: 255,
            },
           
        },
        messages: {
            question: {
                required: 'Please enter question',
                minlength: 'Question must be at least 5 characters',
                maxlength: 'Question must be less than 255 characters',
            },
            answer: {
                required: 'Please enter answer',
                minlength: 'Answer must be at least 5 characters',
                maxlength: 'Answer must be less than 255 characters',
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
            form.submit();
        }
    });

    $('#edit-qa-form').validate({
        rules: {
            question: {
                required: true,
                minlength: 5,
                maxlength: 255,
            },
            answer: {
                required: true,
                minlength: 5,
                maxlength: 255,
            },
           
        },
        messages: {
            question: {
                required: 'Please enter question',
                minlength: 'Question must be at least 5 characters',
                maxlength: 'Question must be less than 255 characters',
            },
            answer: {
                required: 'Please enter answer',
                minlength: 'Answer must be at least 5 characters',
                maxlength: 'Answer must be less than 255 characters',
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
            form.submit();
        }
    });
    
    $('#text-form').validate({
        rules: {
            addtext: {
                required: true,
                minlength: 5,
            },
        },
        messages: {
            addtext: {
                required: 'Please enter text',
                minlength: 'Text must be at least 5 characters',
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
            form.submit();
        }
    });

    $('#edit-text').validate({
        rules: {
            edittext: {
                required: true,
                minlength: 5,
            },
        },
        messages: {
            edittext: {
                required: 'Please enter text',
                minlength: 'Text must be at least 5 characters',
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
            form.submit();
        }
    });
    
}); 
    