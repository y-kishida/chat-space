json.content @message.content
json.image @message.image.url
json.id  @message.id
json.user_name  @message.user.name
json.created_at  @message.created_at.strftime("%Y/%m/%d %H:%M")