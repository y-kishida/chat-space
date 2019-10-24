$(function(){
  function buildHTML(message){
    var content = message.content ? `${message.content}` : "";
    var img = message.image ? `<img src= "${message.image}">` : "";
    var html = `<div class="message"data-message-id= "${message.id}">
                  <div class="message__up-info">
                    <p class="message__up-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__up-info__date">
                      ${message.created_at}
                    </p>
                  </div>
                    <p class="message-text">
                      ${content}
                    </p>
                      ${img}
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
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
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.messages').animate({
        scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    })
  });
    //自動更新機能
    var reloadMessages = function() {
      if (location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.chat-contents__messages__message:last').data('message-id');

    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })

    .done(function(messages){
      var insertHTML='';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.chat-contents__messages').append(insertHTML);
          $('.message').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        });
    })
    .fail(function(){
      alert("自動更新に失敗しました")
    });
  };
};
setInterval(reloadMessages, 5000);
});
