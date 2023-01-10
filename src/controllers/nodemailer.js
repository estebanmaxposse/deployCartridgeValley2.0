import { createTransport } from "nodemailer";
import config from '../config/globalConfig.js';

const TEST_MAIL = config.SENT_MAIL

const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: 'zermzqcefqbkqnnv'
    }
});

const mailOptions = {
    from: 'Node Server API PUG',
    to: config.RECIEVE_MAIL,
    subject: '',
    html: ''
};

const mailUser = async (user) => {
    try {
        mailOptions.subject = 'New user registered!'
        mailOptions.html= `
            <h1>New User Registered!</h1>
            <br/>
            <img
                src=${user.avatar}
                alt="avatar"
                style="width: 150px"
            />
            <h2 id="profile-username">${user.username}</h2>
            <p id="profile-email">Email: ${user.email}</p>
            <p id="profile-full-name">Full name: ${user.fullName}</p>
            <p id="profile-address">Shipping address: ${user.shippingAddress}</p>
            <p id="profile-phone-number">Phone number: ${user.phoneNumber}</p>
            <p id="profile-age">Age: ${user.age}</p>
            `
        const info = await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error);
    }
};

const mailPurchase = async (user) => {
    try {
        mailOptions.subject = 'New user registered!'
        mailOptions.html= `
            <h1>New User Registered!</h1>
            <br/>
            <img
                src=${user.avatar}
                alt="avatar"
                style="width: 150px"
            />
            <h2 id="profile-username">${user.username}</h2>
            <p id="profile-email">Email: ${user.email}</p>
            <p id="profile-full-name">Full name: ${user.fullName}</p>
            <p id="profile-address">Shipping address: ${user.shippingAddress}</p>
            <p id="profile-phone-number">Phone number: ${user.phoneNumber}</p>
            <p id="profile-age">Age: ${user.age}</p>
            `
        const info = await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error);
    }
};

export {mailUser}