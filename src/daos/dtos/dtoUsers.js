class userDTO {
    constructor(user) {
        this._id = user._id
        this.username = user.username
        this.fullName = user.fullName
        this.phoneNumber = user.phoneNumber
        this.shippingAddress = user.shippingAddress
        this.email = user.email
        this.admin = user.admin
        this.age = user.age
        this.avatar = user.avatar
        this.password = user.password
    }
}

export default userDTO