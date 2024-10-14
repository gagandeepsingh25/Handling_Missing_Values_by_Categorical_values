$(document).ready(function(){

    $('#whatsapp_connect').validate({
    rules: {
        api_key: {
            required: true,
           
        },
        phone_id: {
            required: true,
            minlength: 5,
            // maxlength: 50,
        },
        token: {
            required: true,
            minlength: 5,
            // maxlength: 50,
        },
    },
    messages: {
        api_key: {
            required: 'Please select API key',
            minlength: 'Phone ID name must be at least 5 characters',
            maxlength: 'Chatbot name must be less than 50 characters',
        },
        phone_id: {
            required: 'Please enter Phone ID',
            minlength: 'Phone ID name must be at least 5 characters',
            maxlength: 'Phone ID name must be less than 50 characters',
        },
        token: {
            required: 'Please enter Token',
            minlength: 'Token name must be at least 5 characters',
            maxlength: 'Token name must be less than 50 characters',
        },
        fb_pages: {
            required: "Please select anyone pages",
        }
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
$('#facebook_connect').validate({
    rules: {
        api_key: {
            required: true,
            
        },
        page_id: {
            required: true,
            minlength: 5,
            // maxlength: 50,
        },
        token: {
            required: true,
            minlength: 5,
            // maxlength: 50,
        },
        fb_pages: {
            required: true,
        }
    },
    messages: {
        api_key: {
            required: 'Please select API key',
        },
        page_id: {
            required: 'Please enter Page ID',
            minlength: 'Page ID name must be at least 5 characters',
            maxlength: 'Page ID name must be less than 50 characters',
        },
        token: {
            required: 'Please enter Token',
            minlength: 'Token name must be at least 5 characters',
            maxlength: 'Token name must be less than 50 characters',
        },
        fb_pages: {
            required: "Please select anyone pages",
        }
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