const nodemailer = require('nodemailer');

// env import

const {EMAIL_OWNER , EMAIL_OWNER_PASS} = process.env;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_OWNER ,
        pass: EMAIL_OWNER_PASS
    }
});


module.exports = transporter