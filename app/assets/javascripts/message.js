$(function(){
 
  function buildHTML(message){

    var image = message.image? `<img src="${message.image}" class="message_text"></img>` : "" ;

    var html = `<div class="message" data-id="${message.id}">
                  <div class="message_upper-info">
                    <div class="message_upper-info_talker">
                      ${message.user_name}
                    </div>
                    <div class="message_upper-info_date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message_text">
                    <p class="lower-message__content">
                      ${message.content}   
                    </p>
                      ${image}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $("#new_message")[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('.sentbtn').prop('disabled', false);
    })
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.message:last').data("id");
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML); 
        $('div').animate({scrollTop: $('.messages').height()})
        })
      })
      .fail(function() {
        alert('更新に失敗しました');
      });
    };
  } 
  setInterval(reloadMessages, 5000); 
});