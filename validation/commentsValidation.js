const {body} = require('express-validator')

const CommentsVal = ()=>{
    return[
        body('title').notEmpty().withMessage('title is empty').isLength({max:150 , min:3}).withMessage('title must be at leatest 3 cahracters and max cahracters fewer than 150'),
        body('text').notEmpty().withMessage('text is empty'),
        body('rptitle').notEmpty().withMessage('title is empty').isLength({max:150 , min:0}).withMessage('title must be at leatest 0 cahracters and max cahracters fewer than 150'),
    ]
}    




module.exports = CommentsVal;