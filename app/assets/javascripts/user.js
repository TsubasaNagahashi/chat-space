$(document).on("turbolinks:load", function() {
  function buildAddUserHTML(user) {
    var html =
                `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>`
    return html;
  }

  function buildMemberHTML(user, id) {
    var html =
                `<div class="chat-group-user clearfix js-chat-member" id=${id}>
                  <input name="group[user_ids][]" type="hidden" value=${id}>
                  <p class="chat-group-user__name">${user}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div>`
    return html;
  }

  $("#user_search_field").on("keyup", function() {

    $("#user_search_result").children().remove();
    var textField = $("#user_search_field");
    var user = textField.val();
    if (user == ""){

    } else {

      $.ajax({
        type: 'GET',
        url: '/users',
        data: {
          user: user,
          group_id: $(".chat-group-form__label").attr("data")
        },
        dataType: 'json'
      })

      .done(function(data) {
        data.forEach(function(user){
          var html = buildAddUserHTML(user);
          $('#user_search_result').append(html);
        });
      })

      .fail(function() {
        alert('エラーが起きました');
      });

      return false;
    }
  })

  $("#user_search_result").on("click", ".chat-group-user__btn--add", function() {
    var user = $(this).data('user-name');
    var id = $(this).data('user-id');
    var html = buildMemberHTML(user, id);
    $('#chat-group-users').append(html);
    $(this).parent().remove();
  });

  $("#chat-group-users").on("click", ".chat-group-user__btn--remove", function(){
    $(this).parent().remove();
  });
});