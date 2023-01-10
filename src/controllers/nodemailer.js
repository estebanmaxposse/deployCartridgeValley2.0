import { createTransport } from "nodemailer";
import config from '../config/globalConfig.js';

const TEST_MAIL = config.SENT_MAIL

const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: 'UWebYVt6MzgGECpppD'
    }
});

const mailOptions = {
    from: 'Node Server API PUG',
    to: 'estebanmaxposse@hotmail.com',
    subject: 'New user registered',
    html: '<h1> HI! </h1>'
};

const mailUser = async () => {
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info);
    } catch (error) {
        console.log(error);
    }
};

mailUser()