$(document).ready(function(){
    jQuery.validator.addMethod("specialChars", function(value, element) {
        var regex = /^[a-zA-Z0-9\s]+$/;  // Updated regex to allow alphanumeric characters and spaces
        var key = value;
    
        if (!regex.test(key)) {
            return false;
        }
        return true;
    }, "Please use only alphanumeric or alphabetic characters");
      
    $('#addRoleForm1').validate({
    rules: {
        modalRoleName: {
            required: true,
            minlength: 2,
            maxlength: 50,
            specialChars: true
        }
    },
    messages: {
        modalRoleName: {
            required: 'Please enter Chatbot role name',
            minlength: 'Chatbot role name must be at least 2 characters',
            maxlength: 'Chatbot role name must be less than 50 characters',
        },
    },
    errorPlacement: function (error, element) {
        var customError = $([
            '<div class="fv-plugins-message-container invalid-feedback">',
            '<div data-field="' + element.attr("name") + '" data-validator="notEmpty">',
            '</div>',
            '</div>'
        ].join(""));
        error.appendTo(customError.find('div[data-field][data-validator]'));
        customError.insertAfter(element);
    },
    highlight: function (element) {
        $(element).addClass("is-invalid");
    },
    unhighlight: function (element) {
        $(element).removeClass("is-invalid");
    },
    submitHandler: function (form) {
        $(form).find(':submit').prop('disabled', true);
        form.submit();
    }
});

    $('#editRoleForm1').validate({
    rules: {
        modalRoleName: {
            required: true,
            minlength: 2,
            maxlength: 50,
            specialChars: true
        }
    },
    messages: {
        modalRoleName: {
            required: 'Please enter Chatbot role name',
            minlength: 'Chatbot role name must be at least 2 characters',
            maxlength: 'Chatbot role name must be less than 50 characters',
        },
    },
    errorPlacement: function (error, element) {
        var customError = $([
            '<div class="fv-plugins-message-container invalid-feedback">',
            '<div data-field="' + element.attr("name") + '" data-validator="notEmpty">',
            '</div>',
            '</div>'
        ].join(""));
        error.appendTo(customError.find('div[data-field][data-validator]'));
        customError.insertAfter(element);
    },
    highlight: function (element) {
        $(element).addClass("is-invalid");
    },
    unhighlight: function (element) {
        $(element).removeClass("is-invalid");
    },
    submitHandler: function (form) {
        $(form).find(':submit').prop('disabled', true);
        form.submit();
    }
});

});