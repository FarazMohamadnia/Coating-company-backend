const {body} = require('express-validator')

const StoryVal = ()=>{
    return[
        body('image1').notEmpty().withMessage('image1 is empety'),
        body('image2').notEmpty().withMessage('image2 is empety')
    ]
}    




module.exports = StoryVal;