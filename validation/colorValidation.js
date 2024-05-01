const {body} = require('express-validator')

const ColorVal = ()=>{
    return[
        body('title').notEmpty().withMessage('title in empty'),
        body('description').notEmpty().withMessage('description is empty'),
        body('Photo').notEmpty().withMessage('photo is empety')
    ]
}    




module.exports = ColorVal;