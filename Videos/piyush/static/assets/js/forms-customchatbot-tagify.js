(function () {
  const TagifyChatbotList = document.querySelector('#ChatbotList');

  function fetchChatbotSuggestions(query, callback) {
    $.ajax({
      url: '/chatbot-suggestions/', // Update this URL to your Django view URL
      data: { query: query },
      dataType: 'json',
      success: function (data) {
        callback(data);
      }
    });
  }

  function suggestionItemTemplate(tagData) {
    return `
      <div ${this.getAttributes(tagData)}
        class='tagify__dropdown__item align-items-center ${tagData.class ? tagData.class : ''}'
        tabindex="0"
        role="option"
      >
        <div class='tagify__dropdown__item__avatar-wrap'>
          <img onerror="this.style.visibility='hidden'" src="${tagData.avatar}">
        </div>
        <strong>${tagData.name}</strong>
      </div>
    `;
  }

  let TagifyUserList = new Tagify(TagifyChatbotList, {
    tagTextProp: 'name',
    enforceWhitelist: true,
    skipInvalid: true,
    dropdown: {
      closeOnSelect: true,
      enabled: 0,
      classname: 'users-list',
      searchKeys: ['name'] // Search only by chatbot names
    },
    templates: {
      dropdownItem: suggestionItemTemplate
    },
    maxTags: 1,
    whitelist: []
  });

  TagifyUserList.on('input', function (e) {
    const query = e.detail.value;
    if (query.length >= 2) {
      fetchChatbotSuggestions(query, function (data) {
        TagifyUserList.settings.whitelist = data;
        TagifyUserList.dropdown.show.call(TagifyUserList, query);
      });
    }
  });

  TagifyUserList.on('focus', function (e) {
    const queryfocus = e.detail.value;
    fetchChatbotSuggestions(queryfocus, function (data) {
      TagifyUserList.settings.whitelist = data;
      TagifyUserList.dropdown.show.call(TagifyUserList, "");
    });
  });

  const ChatbotId = document.getElementById('selectedChatbot_id');
  TagifyUserList.on('add', function (e) {
    const selectedValue = e.detail.data.value;
    ChatbotId.value = selectedValue;
    
  });
  TagifyUserList.on('remove', function (e) {
    ChatbotId.value = null;
  });
})();
