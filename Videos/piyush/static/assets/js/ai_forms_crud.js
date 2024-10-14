
$(document).ready(function () {

  registerInputChanges();
  registerDraggable();
  registerSubmissions();
});



function registerInputChanges() {
  $(document).on(
    "change",
    'input[type="checkbox"][class="switch-input"][field-type="required"]',
    function () {
      var label = $(this).closest(".accordion-item").find(".label-field");
      var commonInput = label.next(".common_input");
      var text_data = label.text();

      if ($(this).is(":checked")) {
        if (!text_data.endsWith("*")) {
          // Check if asterisk is already present
          label.text(text_data + "*"); // Add asterisk if not present
        }
      } else {
        if (text_data.endsWith("*")) {
          // Check if asterisk is present
          label.text(text_data.slice(0, -1)); // Remove the asterisk
        }
      }
    }
  );

  $(document).on(
    "change",
    'input[type="checkbox"][name="field_name"]',
    function () {
      const commonInput = $(this)
        .closest(".accordion-item")
        .find(".common_input");

      if ($(this).is(":checked")) {
        commonInput.attr("type", "hidden");
      } else {
        commonInput.attr("type", "text");
      }
    }
  );

  $(document).on(
    "input",
    'input[type="text"][field-type="label"]',
    function () {
      const label = $(this).closest(".accordion-item").find(".label-field");
      label.text($(this).val());
    }
  );

  $(document).on(
    "input",
    'input[type="text"][field-type="placeholder"]',
    function () {
      const commonInput = $(this)
        .closest(".accordion-item")
        .find(".common_input");
      commonInput.attr("placeholder", $(this).val());
    }
  );

  $(document).on(
    "input",
    'input[type="text"][field-type="default-text"]',
    function () {
      const commonInput = $(this)
        .closest(".accordion-item")
        .find(".common_input");
      commonInput.val($(this).val());
    }
  );

  $(document).on(
    "input",
    'input[type="text"][field-type="help-text"]',
    function () {
      const commonInput = $(this)
        .closest(".accordion-item")
        .find(".help-text");
      commonInput.text($(this).val());
    }
  );

}

function registerDraggable() {
  const cardEl = $('#sortable-cards');
  const handleList1 = $('#handle-list-1');
  const handleList2 = $('#handle-list-2');
  const handleList3 = $('#handle-list-3');

  // Cards
  // --------------------------------------------------------------------
  if (cardEl.length) {
    Sortable.create(cardEl[0]);
  }

  // Handles
  // --------------------------------------------------------------------
  if (handleList1.length) {
    Sortable.create(handleList1[0], {
      animation: 150,
      group: 'handleList',
      handle: '#handle-list-1 .drag-handle',
      onSort: function (evt) {
        var destination_div = evt.to.id;
        var updatedContent = evt.item;
        var field_name = updatedContent.getAttribute('field_name');
        var field_id = updatedContent.getAttribute('field_id');
        var field_type = updatedContent.getAttribute('field_type');
        var field_list = updatedContent.getAttribute('field_list');
        var field_string = getPreviewField(field_type, field_name, field_id);
        // alert("lis1" + field_list + " " + destination_div + " ");
        if (destination_div === "handle-list-2") {
          if (updatedContent) {
            $(updatedContent).html(field_string);
            updatedContent.classList.remove("d-flex");

          }
        } else if (destination_div === "handle-list-1") {
          if (updatedContent) {
            var field_string = getPreviewField('default', field_name, field_id)
            updatedContent.innerHTML = field_string;
          }
        }
      },
    });
  }
  if (handleList3.length) {
    Sortable.create(handleList3[0], {
      animation: 150,
      group: 'handleList',
      handle: '#handle-list-3 .drag-handle',
      onSort: function (evt) {
        var destination_div = evt.to.id;
        var updatedContent = evt.item;
        var field_name = updatedContent.getAttribute('field_name');
        var field_id = updatedContent.getAttribute('field_id');
        var field_type = updatedContent.getAttribute('field_type');
        var field_list = updatedContent.getAttribute('field_list');
        var field_string = getPreviewField(field_type, field_name, field_id)
        // alert("lis3:" + field_list + " " + destination_div + " ");

        if (destination_div === "handle-list-2") {
          if (updatedContent) {
            $(updatedContent).html(field_string);
            updatedContent.classList.remove("d-flex");

          }
        } else if (destination_div === "handle-list-3") {
          if (updatedContent) {
            var field_string = getPreviewField('default', field_name, field_id)
            updatedContent.innerHTML = field_string;
          }
        }
      },
    });
  }

  if (handleList2.length) {
    Sortable.create(handleList2[0], {
      animation: 150,
      group: 'handleList',
      handle: '#handle-list-2 .drag-handle',
      onSort: function (evt) {
        var destination_div = evt.to.id;
        var updatedContent = evt.item;
        var field_name = updatedContent.getAttribute('field_name');
        var field_id = updatedContent.getAttribute('field_id');
        var field_type = updatedContent.getAttribute('field_type');
        var field_list = updatedContent.getAttribute('field_list');
        var field_string = getPreviewField(field_type, field_name, field_id)
        var accordionElement = updatedContent.querySelector(".accordion");
        if (accordionElement) {
          accordionElement.innerHTML = "";
        }

        // alert("list2:"+field_list+" "+destination_div+" ");
        if (destination_div === "handle-list-2") {
          $(updatedContent).html(field_string);
          updatedContent.classList.remove("d-flex");
        } else if (field_list == 'existing' && destination_div === "handle-list-1") {
          if (updatedContent) {
            var field_string = getPreviewField('default', field_name, field_id)
            updatedContent.innerHTML = field_string;
          }
        } else if (field_list == 'new' && destination_div === "handle-list-3") {
          if (updatedContent) {
            var field_string = getPreviewField('default', field_name, field_id)
            updatedContent.innerHTML = field_string;
          }
        }
      }
    });
  }
}

$(document).ready(function(){
  $('#addChatbotForm').validate({
  rules: {
      form_name: {
          required: true,
          minlength: 2,
          maxlength: 50,
      }
  },
  messages: {
      form_name: {
          required: 'Please enter Form name',
          minlength: 'Form name must be at least 2 characters',
          maxlength: 'Form name must be less than 50 characters',
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
    var csrfToken = $("input[name='csrfmiddlewaretoken']").val();
    var encrypted_chatbot_id = $("input[name='encrypted_chatbot_id']").val();
    // Create an array to hold the field data
    var fieldDataArray = [];

    // Loop through each accordion item
    $(".accordion-item").each(function () {
      var field_name = $(this)
        .find('input[field-type="help-text"]')
        .attr("name");
      var field_type = $(this)
        .find('input[field-type="help-text"]')
        .attr("field_type");
      var field_id = $(this)
        .find('input[field-type="help-text"]')
        .attr("field_id");
      var field_id = $(this)
        .find('input[field-type="help-text"]')
        .attr("field_id");
      var hidden = $(this).find('input[type="checkbox"]').is(":checked");
      var help_text = $(this).find('input[field-type="help-text"]').val();
      var type = $(this).find("input.common_input").attr("type");

      // Create an object for each field
      var fieldData = {
        field_id: field_name,
        field_name: field_name,
        type: type,
        help_text: help_text,
        hidden: hidden,
        field_type: field_type,
        field_id: field_id,
        extra: {},
        html: $(this).html(),
      };
      if (field_type == "dropdown") {
        fieldData.multiple = $(this)
          .find('input[name="multiple"]')
          .is(":checked");
        var options = $(this).find("input[field-type='option']");
        // Create an array to store the option values
        var optionValues = [];

        // Loop through each selected element and get its value
        options.each(function () {
          var optionValue = $(this).val();
          optionValues.push(optionValue);
        });
        fieldData.extra.options = optionValues;
      }
      if(field_type == "radio"){
        var options = $(this).find("input[field-type='option']");
        // Create an array to store the option values
        var optionValues = [];

        // Loop through each selected element and get its value
        options.each(function () {
          var optionValue = $(this).val();
          optionValues.push(optionValue);
        });
        fieldData.extra.options = optionValues;
      }
      if (field_type == "number") {
        fieldData.extra.min = $(this).find('input[name="min"]').val();
        fieldData.extra.max = $(this).find('input[name="max"]').val();
      }
      // Add the field data object to the array
      fieldDataArray.push(fieldData);
    });
    if (fieldDataArray.length == 0) {
      alert("Please add atleast one field");
      return false;
    }
    // Create the final nested data structure
    var postData = {
      form_name: $('input[name="form_name"]').val(),
      show_as_chat: $('input[name="show_as_chat"]').is(":checked"),
      form_values: fieldDataArray,
    };
    // Send the data via AJAX to the server
    encrypted_template_id = $(this).find('input[name="encrypted_template_id"]').val();
    url = '/add-chatbot-form/' + encrypted_chatbot_id;
    if (encrypted_template_id && encrypted_template_id!="") {
      url = "/update-chatbot-form/" + encrypted_template_id;
    }
    $.ajax({
      type: "POST",
      url: url, // Replace with your URL
      data: JSON.stringify(postData),
      contentType: "application/json",
      headers: {
        "X-CSRFToken": csrfToken,
      },
      success: function (response) {
        if (response.success) {
          $("#addFormModal").modal("hide");
          location.reload();
        } else {
          alert("Something went wrong");
        }
        // Handle the response from the server if needed
      },
      error: function (error) {
        if (error.responseJSON && error.responseJSON.error) {
          alert(error.responseJSON.error);
        } else {
          alert("Something went wrong");
        }
        // Handle any errors if needed
      },
    });

  }
});
});

function registerSubmissions1() {

  $("#addChatbotForm").submit(function (event) {
    event.preventDefault(); // Prevent the default form submission
    var csrfToken = $("input[name='csrfmiddlewaretoken']").val();
    var encrypted_chatbot_id = $("input[name='encrypted_chatbot_id']").val();
    // Create an array to hold the field data
    var fieldDataArray = [];

    // Loop through each accordion item
    $(".accordion-item").each(function () {
      var field_name = $(this)
        .find('input[field-type="help-text"]')
        .attr("name");
      var field_type = $(this)
        .find('input[field-type="help-text"]')
        .attr("field_type");
      var field_id = $(this)
        .find('input[field-type="help-text"]')
        .attr("field_id");
      var field_id = $(this)
        .find('input[field-type="help-text"]')
        .attr("field_id");
      var hidden = $(this).find('input[type="checkbox"]').is(":checked");
      var help_text = $(this).find('input[field-type="help-text"]').val();
      var type = $(this).find("input.common_input").attr("type");

      // Create an object for each field
      var fieldData = {
        field_id: field_name,
        field_name: field_name,
        type: type,
        help_text: help_text,
        hidden: hidden,
        field_type: field_type,
        field_id: field_id,
        extra: {},
        html: $(this).html(),
      };
      if (field_type == "dropdown") {
        fieldData.multiple = $(this)
          .find('input[name="multiple"]')
          .is(":checked");
        var options = $(this).find("input[field-type='option']");
        // Create an array to store the option values
        var optionValues = [];

        // Loop through each selected element and get its value
        options.each(function () {
          var optionValue = $(this).val();
          optionValues.push(optionValue);
        });
        fieldData.extra.options = optionValues;
      }
      if(field_type == "radio"){
        var options = $(this).find("input[field-type='option']");
        // Create an array to store the option values
        var optionValues = [];

        // Loop through each selected element and get its value
        options.each(function () {
          var optionValue = $(this).val();
          optionValues.push(optionValue);
        });
        fieldData.extra.options = optionValues;
      }
      if (field_type == "number") {
        fieldData.extra.min = $(this).find('input[name="min"]').val();
        fieldData.extra.max = $(this).find('input[name="max"]').val();
      }
      // Add the field data object to the array
      fieldDataArray.push(fieldData);
    });
    if (fieldDataArray.length == 0) {
      alert("Please add atleast one field");
      return false;
    }
    // Create the final nested data structure
    var postData = {
      form_name: $('input[name="form_name"]').val(),
      show_as_chat: $('input[name="show_as_chat"]').is(":checked"),
      form_values: fieldDataArray,
    };
    // Send the data via AJAX to the server
    encrypted_template_id = $(this).find('input[name="encrypted_template_id"]').val();
    url = '/add-chatbot-form/' + encrypted_chatbot_id;
    if (encrypted_template_id && encrypted_template_id!="") {
      url = "/update-chatbot-form/" + encrypted_template_id;
    }
    $.ajax({
      type: "POST",
      url: url, // Replace with your URL
      data: JSON.stringify(postData),
      contentType: "application/json",
      headers: {
        "X-CSRFToken": csrfToken,
      },
      success: function (response) {
        if (response.success) {
          $("#addFormModal").modal("hide");
          location.reload();
        } else {
          alert("Something went wrong");
        }
        // Handle the response from the server if needed
      },
      error: function (error) {
        if (error.responseJSON && error.responseJSON.error) {
          alert(error.responseJSON.error);
        } else {
          alert("Something went wrong");
        }
        // Handle any errors if needed
      },
    });
  });
  // $("#gSheetMappingForm").submit(function (event) {
  //   event.preventDefault(); // Prevent the default form submission
  //   var csrfToken = $("input[name='csrfmiddlewaretoken']").val();
  //   var encrypted_chatbot_id = $("input[name='encrypted_chatbot_id']").val();
  //   // Create an array to hold the field data
  //   var fieldDataArray = [];
  //   $("#mapping-list-1 input").each(function () {
  //     var field_name = $(this).attr("name");
  //     var field_id = $(this).attr("field_id");
  //     var sheet_column = $(this).val();
  //     var fieldData = {
  //       field_id: field_id,
  //       field_name: field_name,
  //       sheet_column: sheet_column,
  //     };
  //     fieldDataArray.push(fieldData);
  //   });
  //   // Create the final nested data structure
  //   var postData = {
  //     form_values: fieldDataArray,
  //   };
  //   debugger
  //   // Send the data via AJAX to the server
  //   encrypted_template_id = $(this).find('input[name="encrypted_template_id"]').val();
  //   url = '/add-chatbot-form-mappings/' + encrypted_chatbot_id;
  //   if (encrypted_template_id && encrypted_template_id!="") {
  //     url = "/update-chatbot-form-mappings/" + encrypted_template_id;
  //   }
  //   $.ajax({
  //     type: "POST",
  //     url: url, // Replace with your URL
  //     data: JSON.stringify(postData),
  //     contentType: "application/json",
  //     headers: {
  //       "X-CSRFToken": csrfToken,
  //     },
  //     success: function (response) {
  //       if (response.success) {
  //         $("#gSheetMapping").modal("hide");
  //         location.reload();
  //       } else {
  //         alert("Something went wrong");
  //       }
  //       // Handle the response from the server if needed
  //     }

  //   });
  // });
}

function addFormLoad() {
  $.ajax({
    type: "POST",
    url: "/get_new_fields/",
    success: function (data) {
      $('.hide-on-view').show();
      $("#encrypted_template_id").val("");
      defined_fields = data.defined_fields || [];
      new_fields = data.new_fields || [];
      $("#template_form_name").attr("disabled", false);
      $("#addChatbotFormSubmit").attr("disabled", false);

      var html = "";
      $(defined_fields).each(function (key, value) {
        html += getInputField(value);
      });
      $("#handle-list-1").html(html);
      html = "";
      $(new_fields).each(function (key, value) {
        html += getInputField(value);
      });
      $("#handle-list-3").html(html);

      $("#handle-list-2").html("");

      $("#addFormModal").modal("show");

    },
    error: function (error) {
      if (error.responseJSON && error.responseJSON.error) {
        alert(error.responseJSON.error);
      } else {
        alert("Something went wrong");
      }
    },
  });
}

function linkGoogleSheet(template_id) {
  var csrfToken = $("input[name='csrfmiddlewaretoken']").val();
  $.ajax({
    type: "POST",
    url: "/get-chatbot-form-mappings/" + template_id,
    data: JSON.stringify({}),
    contentType: "application/json",
    headers: {
      "X-CSRFToken": csrfToken,
    },
    success: function (data) {
      $("input[name='encrypted_template_id_mapping']")
        .val(template_id);
      if(!data.mappings || !data.mappings.sheet_name){
        $("input[name='sheet_name']").val(data.template_name);
      }else{
        $("input[name='sheet_name']").val(data.mappings.sheet_name);
      }
      form_fields = data.form_values;
      var html = `<div class="row mb-3">
                      <h5 class="col-sm-2" for="basic-default-name">Form Field</h5>
                      <h5 class="col-sm-10" for="basic-default-name">Column Name in Sheet</h5>
                  </div>
                  `;
      form_fields.forEach(function (field) {
        let extra; // This will hold the parsed JSON or text
        let value; 
        try {
          valid_json = field.extra.replace(/'/g, '"');
          extra = JSON.parse(valid_json); // Attempt to parse as JSON
        } catch (error) {
          extra = field.extra || {}; // Not valid JSON, treat it as text
        }
        field.extra = extra;
        if(data.mappings && data.mappings.data){
          value = data.mappings.data[field.extra.field_name] || "";
        }else{
          value = field.extra.field_name;
        }
        html += `<div class="row mb-3">
                    <label class="col-sm-2 col-form-label" for="basic-default-name">${field.extra.field_name}</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="${field.extra.field_name}" placeholder="Enter Column Name for ${field.extra.field_name}" field-type="help-text" value="${value}" field_id="${field.id}" field_type="${field.field_type}" id="help-text-${field.id}">
                    </div>
                </div>`;
      });
      $("#mapping-list-1").html(html);
      $("#gSheetMapping").modal("show");

    },
    error: function (error) {
      if (error.responseJSON && error.responseJSON.error) {
        alert(error.responseJSON.error);
      } else {
        alert("Something went wrong");
      }
    },
  });
}

function editFormLoad(template_id, is_view = false) {
  var csrfToken = $("input[name='csrfmiddlewaretoken']").val();
  $.ajax({
    type: "POST",
    url: "/view-chatbot-form/" + template_id,
    data: JSON.stringify({}),
    contentType: "application/json",
    headers: {
      "X-CSRFToken": csrfToken,
    },
    success: function (data) {
      template = data.data.template || [];
      preview_fields = data.data.preview_fields || [];
      defined_fields = data.data.defined_fields || [];
      new_fields = data.data.new_fields || [];
      // encrypted_template_id = encryptVariable(template.id);
      encrypted_template_id = template.id;
      $("input[name='encrypted_template_id']").val(encrypted_template_id);
      $("#template_form_name").val(template.name);
      $("input[name='show_as_chat']").prop("checked", template.show_as_chat);
      
      var html = "";
      $("#template_form_name").attr("disabled", is_view);
      $("#addChatbotFormSubmit").attr("disabled", is_view);
      if (is_view) {
        $('.hide-on-view').hide();
      } else {
        $('.hide-on-view').show();
        $(defined_fields).each(function (key, value) {
          html += getInputField(value);
        });
        $("#handle-list-1").html(html);
        html = "";
        $(new_fields).each(function (key, value) {
          html += getInputField(value);
        });
        $("#handle-list-3").html(html);
      }
      html = "";
      $("#handle-list-2").html("");
      $(preview_fields).each(function (key, value) {

        let extra; // This will hold the parsed JSON or text
        try {
          valid_json = value.extra.replace(/'/g, '"');
          extra = JSON.parse(valid_json); // Attempt to parse as JSON
        } catch (error) {
          extra = value.extra || {}; // Not valid JSON, treat it as text
        }
        value.extra = extra;
        // html += getPreviewField(value.input_type, extra.field_name, value.field_id);
        $("#handle-list-2").append(getPresetPreview(value));
      });
      // $("#handle-list-2").html(html);

      $("#addFormModal").modal("show");

    },
    error: function (error) {
      if (error.responseJSON && error.responseJSON.error) {
        alert(error.responseJSON.error);
      } else {
        alert("Something went wrong");
      }
    },
  });
}

function getInputField(field) {
  return `
    <!-- _${field.id} -->
    <li
      class="list-group-item lh-1 d-flex justify-content-between align-items-center drag-handle cursor-move"
      id="draggable"
      field_type="${field.field_type}"
      field_id="${field.id}"
      field_name="${field.field_name}"
      field_list="${field.types}"
    >
      <span
        class="d-flex justify-content-between align-items-center"
        id="draggable"
      >
        <i
          class="drag-handle cursor-move mdi mdi-menu align-text-bottom me-2"
          id="draggable"
        ></i>
        <span>${field.field_name}</span>
      </span>
    </li>`;
}
function getPreviewField(field_type, field_name, field_id) {
  let TextField = `<div class="accordion mt-3 " id="accordionWithIcon">
    <div class="accordion-item">
    <div class="d-flex align-items-center ms-3">
        <small class="help-text ms-1">Enter ${field_name}</small>
    </div>
        <h2 class="accordion-header d-flex align-items-center"> 
            <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse"
                data-bs-target="#accordionWithIcon-${field_id}" aria-expanded="false">
                   <input type="text" class="form-control common_input">
            </button>
        </h2>
        <div id="accordionWithIcon-${field_id}" class="accordion-collapse collapse">
            <div class="accordion-body">
                
                <div class="row mb-3">
                    <label class="col col-form-label" for="basic-default-name">Hidden</label>
                    <div class="col d-flex align-items-center">
                        <label class="switch switch-primary">
                            <input type="checkbox" class="switch-input" field-type="hidden" name='${field_name}_hidden' id="hidden-${field_id}">
                            <span class="switch-toggle-slider">
                                <span class="switch-on"></span>
                                <span class="switch-off"></span>
                            </span>
                        </label>
                    </div>
                </div>

                <div class="row mb-3">
                    <label class="col-sm-2 col-form-label" for="basic-default-name">Label</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="${field_name}" placeholder="Enter Label" field-type="help-text" value="Enter ${field_name}" field_id="${field_id}" field_type="${field_type}" id="help-text-${field_id}">
                    </div>
                </div>

            </div>
        </div>
    </div>
  </div>
  `
  let NumberField = `<div class="accordion mt-3 " id="accordionWithIcon">
          <div class="accordion-item">
          <div class="d-flex align-items-center ms-3">
              <small class="help-text ms-1">Enter ${field_name}</small>
          </div>
              <h2 class="accordion-header d-flex align-items-center">
                  <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse"
                      data-bs-target="#accordionWithIcon-${field_id}" aria-expanded="false">
                      <input type="text" class="form-control common_input">
                  </button>
              </h2>
              <div id="accordionWithIcon-${field_id}" class="accordion-collapse collapse">
                  <div class="accordion-body">
                      
                      <div class="row mb-3">
                          <label class="col col-form-label" for="basic-default-name">Hidden</label>
                          <div class="col d-flex align-items-center">
                              <label class="switch switch-primary">
                                  <input type="checkbox" class="switch-input" field-type="hidden" name=${field_name} id="hidden-${field_id}">
                                  <span class="switch-toggle-slider">
                                      <span class="switch-on"></span>
                                      <span class="switch-off"></span>
                                  </span>
                              </label>
                          </div>
                      </div>

                      <div class="row mb-3">
                          <label class="col-sm-2 col-form-label" for="basic-default-name">Label</label>
                          <div class="col-sm-10">
                              <input type="text" class="form-control" name=${field_name} placeholder="Enter Label" field-type="help-text" value="Enter ${field_name}" field_id="${field_id}" field_type="${field_type}" id="help-text-${field_id}">
                          </div>
                      </div>

                      <div class="row mb-3">
                          <label class="col-sm-2 col-form-label" for="basic-default-name">Min</label>
                          <div class="col-sm-10">
                              <input type="number" class="form-control" name="min" placeholder="Enter min value" value='7' id="min-${field_id}">
                          </div>
                      </div>

                      <div class="row mb-3">
                          <label class="col-sm-2 col-form-label" for="basic-default-name">Max</label>
                          <div class="col-sm-10">
                              <input type="number" class="form-control" name="max" placeholder="Enter max value" value='20' id="max-${field_id}">
                          </div>
                      </div>

                  </div>
              </div>
          </div>
        </div>
        `
  let EmailField = `<div class="accordion mt-3 " id="accordionWithIcon">
          <div class="accordion-item">
          <div class="d-flex align-items-center ms-3">
              <small class="help-text ms-1">Enter ${field_name}</small>
          </div>
              <h2 class="accordion-header d-flex align-items-center">
                  <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse"
                      data-bs-target="#accordionWithIcon-${field_id}" aria-expanded="false">
                      <input type="text" class="form-control common_input">
                  </button>
              </h2>
              <div id="accordionWithIcon-${field_id}" class="accordion-collapse collapse">
                  <div class="accordion-body">

                      <div class="row mb-3">
                          <label class="col col-form-label" for="basic-default-name">Hidden</label>
                          <div class="col d-flex align-items-center">
                              <label class="switch switch-primary">
                                  <input type="checkbox" class="switch-input" field-type="hidden" name="${field_name}" id="hidden-${field_id}">
                                  <span class="switch-toggle-slider">
                                      <span class="switch-on"></span>
                                      <span class="switch-off"></span>
                                  </span>
                              </label>
                          </div>
                      </div>

                      <div class="row mb-3">
                          <label class="col-sm-2 col-form-label" for="basic-default-name">Label</label>
                          <div class="col-sm-10">
                              <input type="text" class="form-control" name=${field_name} placeholder="Enter Label" field-type="help-text" value="Enter ${field_name}" field_id="${field_id}" field_type="${field_type}" id="help-text-${field_id}">
                          </div>
                      </div>

                  </div>
              </div>
          </div>
        </div>
        `
  let TextareaField = `<div class="accordion mt-3 " id="accordionWithIcon">
          <div class="accordion-item">
          <div class="d-flex align-items-center ms-3">
              <small class="help-text ms-1">Enter ${field_name}</small>
          </div>
              <h2 class="accordion-header d-flex align-items-center">
                  <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse"
                      data-bs-target="#accordionWithIcon-${field_id}" aria-expanded="false">
                      <textarea class="form-control common_input"></textarea>
                  </button>
              </h2>
              <div id="accordionWithIcon-${field_id}" class="accordion-collapse collapse">
                  <div class="accordion-body">

                      <div class="row mb-3">
                          <label class="col col-form-label" for="basic-default-name">Hidden</label>
                          <div class="col d-flex align-items-center">
                              <label class="switch switch-primary">
                                  <input type="checkbox" class="switch-input" field-type="hidden" name="${field_name}" id="hidden-${field_id}">
                                  <span class="switch-toggle-slider">
                                      <span class="switch-on"></span>
                                      <span class="switch-off"></span>
                                  </span>
                              </label>
                          </div>
                      </div>

                      <div class="row mb-3">
                          <label class="col-sm-2 col-form-label" for="basic-default-name">Label</label>
                          <div class="col-sm-10">
                              <input type="text" class="form-control" name=${field_name} placeholder="Enter Label" field-type="help-text" value="Enter ${field_name}" field_id="${field_id}" field_type="${field_type}" id="help-text-${field_id}">
                          </div>
                      </div>

                  </div>
              </div>
          </div>
        </div>
        `
  let DropdownField = `<div class="accordion mt-3 " id="accordionWithIcon">
          <div class="accordion-item">
          <div class="d-flex align-items-center ms-3">
              <small class="help-text ms-1">Enter ${field_name}</small>
          </div>
              <h2 class="accordion-header d-flex align-items-center">
                  <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse"
                      data-bs-target="#accordionWithIcon-${field_id}" aria-expanded="false">
                    <select class="form-select common_input"></select>

                  </button>
              </h2>
              <div id="accordionWithIcon-${field_id}" class="accordion-collapse collapse">
                  <div class="accordion-body">

                      <div class="row mb-3">
                          <label class="col col-form-label" for="basic-default-name">Hidden</label>
                          <div class="col d-flex align-items-center">
                              <label class="switch switch-primary">
                                  <input type="checkbox" class="switch-input" field-type="hidden" name="${field_name}" id="hidden-${field_id}">
                                  <span class="switch-toggle-slider">
                                      <span class="switch-on"></span>
                                      <span class="switch-off"></span>
                                  </span>
                              </label>
                          </div>
                      </div>
                      <div class="row mb-3">
                          <label class="col col-form-label" for="basic-default-name">Multiple Selection</label>
                          <div class="col d-flex align-items-center">
                              <label class="switch switch-primary">
                                  <input type="checkbox" class="switch-input" field-type="hidden" name="multiple" id="hidden-${field_id}">
                                  <span class="switch-toggle-slider">
                                      <span class="switch-on"></span>
                                      <span class="switch-off"></span>
                                  </span>
                              </label>
                          </div>
                      </div>

                      <div class="row mb-3">
                          <label class="col-sm-2 col-form-label" for="basic-default-name">Label</label>
                          <div class="col-sm-10">
                              <input type="text" class="form-control" name=${field_name} placeholder="Enter Label" field-type="help-text" value="Enter ${field_name}" field_id="${field_id}" field_type="${field_type}" id="help-text-${field_id}">
                          </div>
                      </div>
                      <div class="row mb-3">
                          <label class="col-sm-2 col-form-label" for="basic-default-name">Options</label>
                          <button type="button" onClick="addOption('${field_id}','${field_name}','${field_type}');" class="float-end btn col-sm-1 waves-effect" >
                                <i class="mdi mdi-plus-box-multiple mdi-20px me-1"></i>
                          </button>
                      </div>
                      <div class="row mb-3" id="option-${field_id}">
                          <div class="col-sm-10" >
                              <input type="text" class="form-control " name=${field_name} placeholder="Enter Label" field-type="option" value="Enter Option" field_id="${field_id}" field_type="${field_type}">
                              </div>
                              
                              <a onClick="delOption('${field_id}');" class="d-flex align-items-center col-sm-1" >
                                <i class="mdi mdi-delete mdi-20px me-1"></i>
                              </a>
                        </div>

                  </div>
              </div>
          </div>
        </div>
        `
  let RadioField = `<div class="accordion mt-3 " id="accordionWithIcon">
          <div class="accordion-item">
          <div class="d-flex align-items-center ms-3">
              <small class="help-text ms-1">Enter ${field_name}</small>
          </div>
              <h2 class="accordion-header d-flex align-items-center">
                  <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse"
                      data-bs-target="#accordionWithIcon-${field_id}" aria-expanded="false">
                    <select class="form-select common_input"></select>

                  </button>
              </h2>
              <div id="accordionWithIcon-${field_id}" class="accordion-collapse collapse">
                  <div class="accordion-body">

                      <div class="row mb-3">
                          <label class="col col-form-label" for="basic-default-name">Hidden</label>
                          <div class="col d-flex align-items-center">
                              <label class="switch switch-primary">
                                  <input type="checkbox" class="switch-input" field-type="hidden" name="${field_name}" id="hidden-${field_id}">
                                  <span class="switch-toggle-slider">
                                      <span class="switch-on"></span>
                                      <span class="switch-off"></span>
                                  </span>
                              </label>
                          </div>
                      </div>

                      <div class="row mb-3">
                          <label class="col-sm-2 col-form-label" for="basic-default-name">Label</label>
                          <div class="col-sm-10">
                              <input type="text" class="form-control" name=${field_name} placeholder="Enter Label" field-type="help-text" value="Enter ${field_name}" field_id="${field_id}" field_type="${field_type}" id="help-text-${field_id}">
                          </div>
                      </div>
                      <div class="row mb-3">
                          <label class="col-sm-2 col-form-label" for="basic-default-name">Options</label>
                          <button type="button" onClick="addOption('${field_id}','${field_name}','${field_type}');" class="float-end btn col-sm-1 waves-effect" >
                                <i class="mdi mdi-plus-box-multiple mdi-20px me-1"></i>
                          </button>
                      </div>
                      <div class="row mb-3" id="option-${field_id}">
                          <div class="col-sm-10" >
                              <input type="text" class="form-control " name=${field_name} placeholder="Enter Label" field-type="option" value="Enter Option" field_id="${field_id}" field_type="${field_type}">
                              </div>
                              
                              <a onClick="delOption('${field_id}');" class="d-flex align-items-center col-sm-1" >
                                <i class="mdi mdi-delete mdi-20px me-1"></i>
                              </a>
                        </div>

                  </div>
              </div>
          </div>
        </div>
        `

  let DefaultField = `<span class="d-flex justify-content-right align-items-center" id="draggable">
    <i class="drag-handle cursor-move mdi mdi-menu align-text-bottom me-2" id="draggable"></i>
    <span>${field_name}</span>
  </span>
  `
  if (field_type === "text") {
    return TextField;
  } else if (field_type === "default") {
    return DefaultField;
  } else if (field_type === "number") {
    return NumberField;
  } else if (field_type === "email") {
    return EmailField;
  } else if (field_type === "textarea") {
    return TextareaField;
  } else if (field_type === "dropdown") {
    return DropdownField;
  } else if (field_type === "radio") {
    return RadioField;
  }
  else {
    return TextField;
  }
}
function getPresetPreview(template) {
  return `
  <li class="list-group-item lh-1 justify-content-between align-items-center drag-handle cursor-move" id="draggable"
  field_type="${template.input_type}"
  field_id="${template.field_id}"
  field_name="${template.extra.field_name}"
  field_list="new"
  draggable="false"
  style="">
    <div class="accordion mt-3 " id="accordionWithIcon">
      <div class="accordion-item">
      ${template.html}
      </div>
    </div>
  </li>
  `
}

function addOption(field_id,field_name,field_type){
  $("#option-"+field_id).append(`
  <div class="col-sm-10" >
    <input type="text" class="form-control " name=${field_name} placeholder="Enter Label" field-type="option" value="Enter Option" field_id="${field_id}" field_type="${field_type}">
    </div>
    <a onClick="delOption('${field_id}');" class="d-flex align-items-center col-sm-1" >
      <i class="mdi mdi-delete mdi-20px me-1"></i>
    </a>
  </div>
 
  `);
}