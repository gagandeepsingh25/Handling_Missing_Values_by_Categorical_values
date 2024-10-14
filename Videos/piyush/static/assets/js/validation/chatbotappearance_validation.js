$(document).ready(function(){
    $.validator.addMethod('allowScript', function(value, element) {
        // Define a regular expression to check for specific script-like patterns
        var allowedScriptPattern = /<\s*(script|allowedScript)\s*>|<\/\s*(script|allowedScript)\s*>/i;
    
        // Check if the input value contains an allowed script pattern
        return allowedScriptPattern.test(value);
    }, 'Invalid input! Please enter valid script tags.');
    
    $.validator.addMethod('allowHTML', function(value, element) {
        // Define a regular expression to check for specific HTML tags
        var allowedHTMLPattern = /<\s*(div|span|p)\s*>|<\/\s*(div|span|p)\s*>/i;
    
        // Check if the input value contains an allowed HTML tag
        return allowedHTMLPattern.test(value);
    }, 'Invalid input! Please enter valid HTML tags (div, span, p).');

    $('#add-suggestions-form').validate({
    rules: {
        suggestiondataUrl: {
            required: true,
            url: true
        },
        suggestionsType: {
            required: true,
        },
        suggestionForm: {
            required: true,
        },
        suggestiondataQuestion: {
                required: true,
                minlength: 2,
                maxlength: 255 
        }, 
        suggestiondataScript: {
            required: true,
            minlength: 10,
            allowScript: true
        },  
        Element: {
                required: true,
                minlength: 10,
                allowHTML:true
        },
        name: {
                required: true,
                minlength: 2,
                maxlength: 255
        }
    },
    messages: {
        suggestiondataUrl: {
            required: "Please enter a URL",
            url: "Please enter a valid URL"
        },
        suggestionsType: {
            required: 'Please select valid suggestion message type',
        },
        suggestiondataForm: {
            required: 'Please select valid suggestion form',
        },
        suggestiondataQuestion: {
            required: "Please enter question",
            minlength: "Question must be at least 2 characters long",
            maxlength: "Question must not exceed 255 characters"
        },
        suggestiondataScript: {
            required: "Please enter Script",
            minlength: "Script must be at least 10 characters long",
        },
        Element: {
            required: "Please enter element",
            minlength: "Element must be at least 10 characters long",
        },
        name: {
            required: "Please enter name",
            minlength: "Name must be at least 2 characters long",
            maxlength: "Name must not exceed 255 characters"
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
        form.submit();
    }
});
    $('#edit-suggestions-form').validate({
    rules: {
        suggestiondataUrl: {
            required: true,
            url: true
        },
        suggestionsType: {
            required: true,
        },
        suggestionForm: {
            required: true,
        },
        suggestiondataQuestion: {
                required: true,
                minlength: 2,
                maxlength: 255
        },  
        suggestiondataScript: {
                required: true,
                minlength: 10,
                allowScript: true
        },  
        Element: {
                required: true,
                minlength: 10,
        },  
        name: {
            required: true,
            minlength: 2,
            maxlength: 255
    }
    },
    messages: {
        suggestiondataUrl: {
            required: "Please enter a URL",
            url: "Please enter a valid URL"
        },
        suggestionsType: {
            required: 'Please select valid suggestion message type',
        },
        suggestiondataForm: {
            required: 'Please select valid suggestion form',
        },
        suggestiondataQuestion: {
            required: "Please enter text",
            minlength: "Question must be at least 2 characters long",
            maxlength: "Question must not exceed 255 characters"
        },
        suggestiondataScript: {
            required: "Please enter Script",
            minlength: "Script must be at least 10 characters long",
        },
        Element: {
            required: "Please enter element",
            minlength: "Element must be at least 10 characters long",
        },
        name: {
            required: "Please enter name",
            minlength: "Name must be at least 2 characters long",
            maxlength: "Name must not exceed 255 characters"
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
        form.submit();
    }
});
});