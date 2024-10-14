$(document).ready(function () {


    $('#url-form').validate({
        rules: {
            url: {
                required: true,
                url: true
            },
        },
        messages: {
            url: {
                required: 'Please enter a URL',
                url: 'Please enter a valid URL'
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