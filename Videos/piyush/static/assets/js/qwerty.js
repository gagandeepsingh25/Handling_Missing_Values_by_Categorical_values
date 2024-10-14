<script>
var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

function getCurrentFormattedTime() {
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    };
    const formattedTime = new Date().toLocaleString("en-US", options);
    return formattedTime;
  }

const currentFormattedTime = getCurrentFormattedTime();

$(document).ready(function (){
  $('#send').click(()=>{
    var question = $('#message').val();
    if (question.length === 0 || question.length > 1024 ) {
            // Show error message
            $('#ErrorMsg').text("Please enter a question with 5 to 1024 characters.");
            return;
    } else{
      // Clear error message
      $('#ErrorMsg').text("");
    var bot_animation = `<li class="chat-message" id="bot-animation">
            <div class="d-flex overflow-hidden">
              <div class="user-avatar flex-shrink-0 me-3">
                <div class="avatar avatar-sm">
                  <img src="{% if cfg.chatbot_image %}{{ cfg.chatbot_image.url }}{% else %}{% static 'assets/img/avatars-v2/25.png' %}{% endif %}" alt="Avatar" class="rounded-circle" />
                </div>
              </div>
              <div class="chat-message-wrapper flex-grow-1">
                <div class="chat-message-text chatbot-msg-background">
                    <div class="loader">
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                </div>
                <div class="text-muted">
                  <small>Now</small>
                </div>
              </div>
            </div>
          </li>`
    var question = $('#message').val();
    var chatdata_id = $('#chatdata_id').val();
    var src_checkbox = $('input[name="src_checkbox"]:checked').length;

    console.log(src_checkbox, "--------------------src_checkbox")
    var history = $('#chat-title').text()
    console.log(history)
    const now = new Date();  // create a new Date object with the current date and time
    const options = {hour12: false, hourCycle:'h23', second:undefined}
    const currentTime = now.toLocaleTimeString([], options);

    var message = `
      <li class="chat-message chat-message-right">
        <div class="d-flex overflow-hidden">
          <div class="chat-message-wrapper flex-grow-1">
            <div class="chat-message-text chatbot-theme user-msg-background user-default-msg-color">
              <p class="mb-0 user-msg-color">${question}</p>
            </div>
            <div class="text-end text-muted">
              <i class="mdi mdi-check-all mdi-14px text-success me-1"></i>
              <small>${currentFormattedTime}</small>
            </div>
          </div>
          <div class="user-avatar flex-shrink-0 ms-3">
            <div class="avatar avatar-sm">
              <img src="{% static 'assets/img/avatars/1.png' %}" alt="Avatar" class="rounded-circle" />
            </div>
          </div>
        </div>
      </li>
    `
    $('#chat-history-ul').append(message)
    $('#chat-history-ul').append(bot_animation)

    $('#ErrorMsg').hide();
    $('#get_source').hide()
    $.ajax({
      type:'POST',
      url:'/chat',
      headers:{
        'X-CSRFToken' : csrftoken
      },
      data:{'history': history, 'question': question, 'chatdata_id': chatdata_id, 'src_checkbox': src_checkbox},
      success: function(data) {
        $('#bot-animation').fadeOut(500)
        const now = new Date();  // create a new Date object with the current date and time
        const currentTime = now.toLocaleTimeString();

        let answer = `
          <li class="chat-message">
            <div class="d-flex overflow-hidden">
              <div class="user-avatar flex-shrink-0 me-3 mt-4">
                <div class="avatar avatar-sm">
                  <img src="{% if cfg.chatbot_image %}{{ cfg.chatbot_image.url }}{% else %}{% static 'assets/img/avatars-v2/25.png' %}{% endif %}" alt="Avatar" class="rounded-circle" />
                </div>
              </div>
              <div class="chat-message-wrapper flex-grow-1">
                <div class="d-flex justify-content-between">
                      <div class="invisible">empty</div>
                        <div class="div">
                          <div class="icon-container float-end" data_id = "{{ chat.id }}">
                          <i class="fas fa-copy icon d-none"></i>
                          <i class="mdi mdi-thumb-up-his {% if chat.positive_comment %}mdi-thumb-up{% else %}mdi-thumb-up-outline{% endif %} icon text-primary thumbsup" type="button" data-bs-toggle="modal" data-bs-target="#thumbsUpModal"></i>
                          <i class="mdi mdi-thumb-down-his {% if chat.negative_comment %}mdi-thumb-down{% else %}mdi-thumb-down-outline{% endif %} icon text-primary thumbsdown" type="button" class="btn btn-sm btn-primary waves-effect waves-light" data-bs-toggle="modal" data-bs-target="#thumbsDownModal"></i>
                        </div>
                      </div>
                  </div>
                <div class="chat-message-text chatbot-msg-background">
                  <p class="mb-0 chatbot-text-color" >${data.response}</p>
                </div>
                <div class="text-muted">
                  <small>${currentFormattedTime}</small>
                </div>
              </div>
            </div>
          </li>
        `
        setTimeout(function() {
          $('#chat-history-ul').append(answer);
          $('#bot-animation').remove()
        }, 500);

        $('#get_source').show()
        $('#get_source').empty()

        if (data.page_content.length > 0) {
            for (let i = 0; i < data.page_content.length; i++) {
                  doc_src = `<p><b>Chunk ${i+1}: </b> ${data.page_content[i][0]}
                  <span class="mdi mdi-link-variant" data-bs-toggle="tooltip"
                  data-bs-placement="bottom" data-bs-original-title="${data.page_content[i][1]}"></span>
                  </p>`
                  $('#get_source').append(doc_src)
                    }

            if (data.namespace.length > 0) {
              $('#get_source').append(`<p><b>Namespace: </b> ${data.namespace}</p>`)
              }

            if (data.index_name.length > 0) {
              $('#get_source').append(`<p><b>Index Name: </b> ${data.index_name}</p>`)
              }

            $('[data-bs-toggle="tooltip"]').tooltip();
        }
        else {
        $('#get_source').hide()
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
          $('#ErrorMsg').show();
          $('#ErrorMsg').empty();
          $('#ErrorMsg').append(`<span class="mdi mdi-alert-circle"></span>&nbsp;There is an Internal Error (500), Please try again.`);
          console.log(jqXHR, textStatus, errorThrown)
       }
    });
  }
  });

  scrollToBottom();

})

</script>