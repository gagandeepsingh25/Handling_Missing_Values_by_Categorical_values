$(document).ready(function () {

  function getField(field_type, field_name, field_id) {
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
                            <input type="checkbox" class="switch-input" field-type="hidden" name='${field_name}_hidden'>
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
                        <input type="text" class="form-control" name="${field_name}" placeholder="Enter Label" field-type="help-text" value="Enter ${field_name}" field_id="${field_id}" field_type="${field_type}">
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
                                  <input type="checkbox" class="switch-input" field-type="hidden" name=${field_name}>
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
                              <input type="text" class="form-control" name=${field_name} placeholder="Enter Label" field-type="help-text" value="Enter ${field_name}" field_id="${field_id}" field_type="${field_type}">
                          </div>
                      </div>

                      <div class="row mb-3">
                          <label class="col-sm-2 col-form-label" for="basic-default-name">Min</label>
                          <div class="col-sm-10">
                              <input type="number" class="form-control" name="min" placeholder="Enter min value" value='7'>
                          </div>
                      </div>

                      <div class="row mb-3">
                          <label class="col-sm-2 col-form-label" for="basic-default-name">Max</label>
                          <div class="col-sm-10">
                              <input type="number" class="form-control" name="max" placeholder="Enter max value" value='20'>
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
                                  <input type="checkbox" class="switch-input" field-type="hidden" name=${field_name}>
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
                              <input type="text" class="form-control" name=${field_name} placeholder="Enter Label" field-type="help-text" value="Enter ${field_name}" field_id="${field_id}" field_type="${field_type}">
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
                                  <input type="checkbox" class="switch-input" field-type="hidden" name=${field_name}>
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
                              <input type="text" class="form-control" name=${field_name} placeholder="Enter Label" field-type="help-text" value="Enter ${field_name}" field_id="${field_id}" field_type="${field_type}">
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
                                  <input type="checkbox" class="switch-input" field-type="hidden" name=${field_name}>
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
                                  <input type="checkbox" class="switch-input" field-type="hidden" name="multiple">
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
                              <input type="text" class="form-control" name=${field_name} placeholder="Enter Label" field-type="help-text" value="Enter ${field_name}" field_id="${field_id}" field_type="${field_type}">
                          </div>
                      </div>
                      <div class="row mb-3">
                          <label class="col-sm-2 col-form-label" for="basic-default-name">Options</label>
                      </div>
                      <div class="row mb-3">
                          <div class="col-sm-10">
                              <input type="text" class="form-control " name=${field_name} placeholder="Enter Label" field-type="help-text" value="Enter Option" field_id="${field_id}" field_type="${field_type}">
                              </div>
                              <a href="javascript:void(0);" class="d-flex align-items-center col-sm-1" >
                                <i class="mdi mdi-plus-box-multiple mdi-20px me-1"></i>
                              </a>
                              <a href="javascript:void(0);" class="d-flex align-items-center col-sm-1" >
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
    }
    else {
      return TextField;
    }
  }


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
        var field_string = getField(field_type, field_name, field_id);
        // alert("lis1" + field_list + " " + destination_div + " ");
        if (destination_div === "handle-list-2") {
          if (updatedContent) {
            $(updatedContent).html(field_string);
            updatedContent.classList.remove("d-flex");

          }
        } else if (destination_div === "handle-list-1") {
          if (updatedContent) {
            var field_string = getField('default', field_name, field_id)
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
        var field_string = getField(field_type, field_name, field_id)
        // alert("lis3:" + field_list + " " + destination_div + " ");

        if (destination_div === "handle-list-2") {
          if (updatedContent) {
            $(updatedContent).html(field_string);
            updatedContent.classList.remove("d-flex");

          }
        } else if (destination_div === "handle-list-3") {
          if (updatedContent) {
            var field_string = getField('default', field_name, field_id)
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
        var field_string = getField(field_type, field_name, field_id)
        var accordionElement = updatedContent.querySelector(".accordion");
        if (accordionElement) {
          accordionElement.innerHTML = "";
        }
        
        // alert("list2:"+field_list+" "+destination_div+" ");
        console.log(updatedContent)
        if (destination_div === "handle-list-2") {
          $(updatedContent).html(field_string);
          updatedContent.classList.remove("d-flex");
        } else if (field_list == 'existing' && destination_div === "handle-list-1") {
          if (updatedContent) {
            var field_string = getField('default', field_name, field_id)
            updatedContent.innerHTML = field_string;
          }
        } else if (field_list == 'new' && destination_div === "handle-list-3") {
          if (updatedContent) {
            var field_string = getField('default', field_name, field_id)
            updatedContent.innerHTML = field_string;
          }
        }
      }
    });
  }
});
