import { createTransport } from "nodemailer";
import config from '../config/globalConfig.js';
import { errorLog } from "./logger.js";

const TEST_MAIL = config.SENT_MAIL

const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: 'zermzqcefqbkqnnv'
    }
});

const mailAdminOptions = {
    from: 'Cartridge Valley Server',
    to: config.RECIEVE_MAIL,
    subject: '',
    html: ''
};

const mailUserOptions = {
    from: 'Cartridge Valley Server',
    to: '',
    subject: '',
    html: ''
}

const mailAdmin = async (user) => {
    try {
        mailAdminOptions.subject = 'New user registered!'
        mailAdminOptions.html= `
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
        const info = await transporter.sendMail(mailAdminOptions)
    } catch (error) {
        errorLog(error);
    }
};

const mailPurchaseToAdmin = async (user, order) => {
    console.log(order);
    try {
        mailAdminOptions.subject = `New purchase from ${user.fullName} with email ${user.email}`
        mailAdminOptions.html= `
            <h1>Objects purchased: </h1>
            <br/>
            <ul>
            ${order.products.map(product => `
                <li>
                   <p>Title: ${product.product.title}</p>
                   <p>Price: ${product.product.price}</p>
                </li>
            `)}
            </ul>
            `
        const info = await transporter.sendMail(mailAdminOptions)
    } catch (error) {
        errorLog(error);
    }
};

const mailPurchaseToUser = async (order) => {
    console.log(order);
    try {
        mailUserOptions.to = order.buyerEmail
        mailUserOptions.subject = `Purchase completed! Your order is being processed.`
        mailUserOptions.html= `
            <h1>Objects purchased: </h1>
            <ul>
            ${order.products.map(product => `
                <li>
                   <p>Title: ${product.product.title}</p>
                   <p>Price: ${product.product.price}</p>
                </li>
            `)}
            </ul>
            <br/>
            <h2>Total Products: </h2>
            <p>${order.orderTotalProducts}</p>
            <br/>
            <h2>Total Price: </h2>
            <p>${order.orderTotalPrice}</p>
            `
        const info = await transporter.sendMail(mailUserOptions)
    } catch (error) {
        errorLog(error);
    }
}

export {mailAdmin, mailPurchaseToAdmin, mailPurchaseToUser}