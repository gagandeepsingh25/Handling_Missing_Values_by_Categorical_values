(function () {
    const TagifyUserListEl = document.querySelector('#UserList');

    const apiUrl = '/user-suggestions/'; // Update this URL to your Django view URL
  
    function fetchSuggestions(query, group_id=null, callback) {
      $.ajax({
        url: apiUrl,
        data: { query: query, group_id:group_id},
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
        ${
             `<div class='tagify__dropdown__item__avatar-wrap'>
                  <img onerror="this.style.visibility='hidden'" src="/static/assets/img/avatars/3.png">
                </div>`
        }
          
          <strong>${tagData.name}</strong>
          <span>${tagData.email}</span>
        </div>
      `;
    }
    
    function tagTemplate(tagData) {
        return `
          <tag title="${tagData.title || tagData.email}"
            contenteditable='false'
            spellcheck='false'
            tabIndex="-1"
            class="${this.settings.classNames.tag} ${tagData.class ? tagData.class : ''}"
            ${this.getAttributes(tagData)}
          >
            <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
            <div>
              <div class='tagify__tag__avatar-wrap'>
                <img onerror="this.style.visibility='hidden'" src="${tagData.avatar}">
              </div>
              <span class='tagify__tag-text'>${tagData.name}</span>
            </div>
          </tag>
        `;
      }
    let TagifyUserList = new Tagify(TagifyUserListEl, {
      tagTextProp: 'name',
      enforceWhitelist: true,
      skipInvalid: true,
      dropdown: {
        closeOnSelect: true,
        enabled: 0,
        classname: 'users-list',
        searchKeys: ['name', 'email']
      },
      templates: {
        tag: tagTemplate,
        dropdownItem: suggestionItemTemplate
      },
      whitelist: []
    });
  
    TagifyUserList.on('input', function (e) {
      const Group_id = document.getElementById('group_id').value;
      const query = e.detail.value;
      if (query.length >= 2) {
        fetchSuggestions(query, Group_id, function (data) {
          TagifyUserList.settings.whitelist = data;
          TagifyUserList.dropdown.show.call(TagifyUserList, query);
        });
      } else {
        fetchSuggestions('', Group_id, function (data) {
          const first50Suggestions = data.slice(0, 50);
          TagifyUserList.settings.whitelist = first50Suggestions;
          TagifyUserList.dropdown.show.call(TagifyUserList, '');
        });
      }
    });
    TagifyUserList.on('focus', function (e) {
      const Group_id = document.getElementById('group_id').value;
      const query = e.detail.value;
      // if (query.length >= 2) {
        fetchSuggestions(query, Group_id, function (data) {
          TagifyUserList.settings.whitelist = data;
          TagifyUserList.dropdown.show.call(TagifyUserList, query);
        });
    });
  
    TagifyUserList.on('keydown', function (e) {
      if (e.key === 'Enter' && e.detail.value === '') {
        const Group_id = document.getElementById('group_id').value;
        fetchSuggestions('', Group_id, function (data) {
          const first50Suggestions = data.slice(0, 50);
          TagifyUserList.settings.whitelist = first50Suggestions;
          TagifyUserList.dropdown.show.call(TagifyUserList, '');
        });
      }
    });

    TagifyUserList.on('dropdown:show dropdown:updated', onDropdownShow);
    TagifyUserList.on('dropdown:select', onSelectSuggestion);
  
    let addAllSuggestionsEl;
  
    function onDropdownShow(e) {
      let dropdownContentEl = e.detail.tagify.DOM.dropdown.content;
  
      if (TagifyUserList.suggestedListItems.length > 1) {
        addAllSuggestionsEl = getAddAllSuggestionsEl();
  
        // Insert "addAllSuggestionsEl" as the first element in the suggestions list
        dropdownContentEl.insertBefore(addAllSuggestionsEl, dropdownContentEl.firstChild);
      }
    }
  
    function onSelectSuggestion(e) {
      if (e.detail.elm == addAllSuggestionsEl) {
        // Check if there's a 'addAll' suggestion and add all unique suggestions
        TagifyUserList.suggestedListItems.forEach(function (item) {
          if (!TagifyUserList.isTagDuplicate(item.value)) {
            TagifyUserList.addTags([item]);
          }
        });
      }
    }
  
    // Create an "add all" custom suggestion element every time the dropdown changes
    function getAddAllSuggestionsEl() {
      // Suggestions items should be based on "dropdownItem" template
      return TagifyUserList.parseTemplate('dropdownItem', [
        {
          class: 'addAll',
          name: 'Add all',
          email:
            TagifyUserList.settings.whitelist.reduce(function (remainingSuggestions, item) {
              return TagifyUserList.isTagDuplicate(item.value) ? remainingSuggestions : remainingSuggestions + 1;
            }, 0) + ' Members'
        }
      ]);
    }
  })();
