const {body} = require('express-validator')
const userSchema = require('../models/usersModels')
const usersVal = ()=>{
    return[
        body('firstName').isLength({min : 4}).withMessage('first name must be at leatest 4 cahracters').notEmpty().withMessage('first name is empty'),
        body('lastName').isLength({min : 4}).withMessage('last Name must be at leatest 4 cahracters').notEmpty().withMessage('last name is empty'),
        body('email').isEmail().withMessage('invalid email address').notEmpty().withMessage('email address is Empty')
        .custom(async (value)=> {
            return userSchema.findOne({email : value}).then(user =>{
                if(user)return Promise.reject('email already is use')
            })
        }),
        body('phoneNumber').notEmpty().withMessage('phone number is empty').isMobilePhone().withMessage('phone number is not valid')
        .custom(async (value)=> {
            return userSchema.findOne({ phoneNumber : value}).then(user =>{
                if(user)return Promise.reject('phone number already is use')
            })
        }),
        body('quantity').isLength({max:1000000}).withMessage('max quantity must to be 1000000'),
        body('color').isLength({max:100}).withMessage('max color length must to be 100'),
    ]
}    




module.exports = usersVal;