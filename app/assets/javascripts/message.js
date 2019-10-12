$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message">
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
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.message').animate({
        scrollTop: $('.message')[0].scrollHeight
      }, 'fast');
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    })
  })
});
