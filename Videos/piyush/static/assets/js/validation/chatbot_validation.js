$(document).ready(function(){
    // jQuery.validator.addMethod("specialChars", function( value, element ) {
    //     var regex = new RegExp("^[a-zA-Z0-9]+$");
    //     var key = value;

    //     if (!regex.test(key)) {
    //        return false;
    //     }
    //     return true;
    // }, "Please use only alphanumeric or alphabetic characters");
      
    $('#addform').validate({
    rules: {
        chatbotname: {
            required: true,
            minlength: 2,
            maxlength: 50,
            // specialChars: true
        }
    },
    messages: {
        chatbotname: {
            required: 'Please enter Chatbot name',
            minlength: 'Chatbot name must be at least 2 characters',
            maxlength: 'Chatbot name must be less than 50 characters',
            // alphanumeric: 'Only allowed numerica characters only'
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

    $('#editForm').validate({
    rules: {
        chatbotname: {
            required: true,
            minlength: 2,
            maxlength: 50,
            // specialChars: true
        }
    },
    messages: {
        chatbotname: {
            required: 'Please enter Chatbot name',
            minlength: 'Chatbot name must be at least 2 characters',
            maxlength: 'Chatbot name must be less than 50 characters',
            // alphanumeric: 'Only allowed numerica characters only'
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