class messageDTO {
    constructor(messageData) {
        this.senderID = messageData.senderID
        this.name = messageData.author.name,
        this.avatar = messageData.author.avatar
        this.author = {
            name: this.name,
            avatar: this.avatar
        }
        this.admin = messageData.admin
        this.text = messageData.text
        this.date = messageData.date
    }
}

export default messageDTO