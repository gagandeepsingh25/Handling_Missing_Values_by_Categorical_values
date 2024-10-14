$(document).ready(function(){
    jQuery.validator.addMethod("noSpace", function(value, element) { 
        return value.indexOf(" ") < 0 && value != ""; 
    }, "No space please and don't leave it empty");

    jQuery.validator.addMethod("alphabetic_chars", function(value, element) {
    var regex = /^[a-zA-Z]+$/;  // Updated regex to allow only alphabetic characters
    var key = value;

    if (!regex.test(key)) {
        return false;
    }
    return true;
    }, "Please use only alphabetic characters");

    jQuery.validator.addMethod("allowEmptySpaceAndNumbers", function(value, element) {
        // If the value is empty or contains only numeric characters, consider it valid
        return /^\s*$|^\d+$/.test(value);
    }, "This field can contain empty spaces and numeric characters only.");
    
    $('#addNewUserFor').validate({
        rules: {
            userFullname: {
                required: true,
                minlength: 2,
                maxlength: 50,
                noSpace: true,
                alphabetic_chars:true,
            },
            userEmail: {
            required: true,
            email: true
            },
            country: {
                required: true,
            },
            role: {
                required: true,
            }, 
            userContact: {
                // allowEmptySpaceAndNumbers: true
                maxlength:10
            },
        
        },
        messages: {
            userFullname: {
                required: 'Please enter first name',
                minlength: 'First name must be at least 2 characters',
                maxlength: 'First name must be less than 50 characters',
            },
            userEmail: {
                required: 'Please enter your email',
                email: 'Please enter a valid email address',
            },
            country: {
                required: 'Please select any one of the country',
            },
            role: {
                required: 'Please select any one of the role',
            },
            userContact: {
                maxlength: "Contact must be less than 10 characters"
            },
        },
        errorPlacement: function (error, element) {
            // Create the custom error container with the nested structure
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

    $('#EditUserForm').validate({
    rules: {
        userFullname: {
            required: true,
            minlength: 2,
            maxlength: 50,
            noSpace: true,
            alphabetic_chars:true,
        },
        country: {
            required: true,
        },
        role: {
            required: true,
        },
        userContact: {
            // allowEmptySpaceAndNumbers: true
            maxlength:10
        },
     
    },
    messages: {
        userFullname: {
            required: 'Please enter first name',
            minlength: 'First name must be at least 2 characters',
            maxlength: 'First name must be less than 50 characters',
        },
        country: {
            required: 'Please select any one of the country',
        },
        role: {
            required: 'Please select any one of the role',
        },
        userContact: {
            maxlength: "Contact must be less than 10 characters"
        },
    },
    errorPlacement: function (error, element) {
        // Create the custom error container with the nested structure
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