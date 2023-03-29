class messageDTO {
    constructor(messageData) {
        this.senderEmail = messageData.senderEmail
        this.senderID = messageData.senderID
        this.author = {
            name: messageData.author.name,
            avatar: messageData.author.avatar
        }
        this.admin = messageData.admin
        this.text = messageData.text
        this.date = messageData.date
    }
}

export default messageDTO