const express = require('express');
const OwnerloginRouter = express.Router();
// bcrypt package
const bcrypt = require('bcryptjs');
// opt package
const otp = require('otp');
//node mailer config import
const transporter = require('../../config/Email/nodemailerConfig')
// env file import
const { ADMIN_USERNAME , ADMIN_PASSWORD , SECRET_KEY , EMAIL_OWNER} = process.env;
// jsonwebtoken import
const jwt = require('jsonwebtoken');
const secretKey = SECRET_KEY ;

// Time contoller :: Email
const accessControlMiddleware = require('../../middlewares/ownerMid/EmailTimestampMiddlewares');

// owner config
const owner = {id:123 , username : ADMIN_USERNAME, password: ADMIN_PASSWORD};

let code;
// send code
OwnerloginRouter.post('/getEmailcode', accessControlMiddleware ,(req, res) => {
    code =new otp({ digits: 6 }).totp();
    const mailOptions = {
        from: EMAIL_OWNER,
        to: 'Farazmnm@gmail.com',
        subject: 'Verification Code',
        text: `Your verification code is: ${code}`
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.status(401).json({
                message : 'The email was not sent',
                error: error
            })
        } else {
            console.log('Email sent: ' + info.response);
            setTimeout(() => {
                code = 0;
            }, 2 * 60 * 1000);
            return res.status(200).send('sending code ');
        }
    });
});

//login
OwnerloginRouter.post('/', (req, res) => {
    const { username, password , sendcode} = req.body;
    try{
        // Check if username or password exists
        if (username === owner.username && bcrypt.compareSync(password, owner.password)&&
        code == sendcode
        ) {
            const token = jwt.sign({ id: owner.id, username: owner.username}, secretKey, { expiresIn:'15d' });
            res.setHeader('Authorization' , token);
            return res.status(200).json({
                message : 'owner is login'
            });
        }else{
            return res.status(401).json({ message: 'Incorrect username or password' });
        }
    }
    catch(err){
        res.status(500).send('Error server');
    }

});

module.exports = OwnerloginRouter

