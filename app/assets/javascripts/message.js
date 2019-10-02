$(function(){
 
  function buildHTML(message){

    var image = message.image? `<img src="${message.image}" class="message_text"></img>` : "" ;

    var html = `<div class="message">
                  <div class="message_upper-info">
                    <div class="message_upper-info_talker">
                      ${message.user_name}
                    </div>
                    <div class="message_upper-info_date">
                      ${message.date}
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
      $('#message_content').val('');
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('.sentbtn').prop('disabled', false);
    })
  })
})