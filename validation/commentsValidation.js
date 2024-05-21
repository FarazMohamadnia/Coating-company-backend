const { min } = require('bn.js');
const {body} = require('express-validator')

const CommentsVal = ()=>{
    return[
        body('title').notEmpty().withMessage('title is empty').isLength({max:250 , min:5}).withMessage('title must be at leatest 5 cahracters and max cahracters fewer than 250'),
        body('text').notEmpty().withMessage('text is empty').isLength({max:4000 , min : 5}).withMessage('first name must be at leatest 5 cahracters and max cahracters fewer than 4000'),
        
    ]
}    




module.exports = CommentsVal;