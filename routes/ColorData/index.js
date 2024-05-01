const express = require('express');
const app = express();
const getPriceRouter = express.Router();
const {
    getColorCard,
    createColorCard,
    deleteColorCard,
    updateColorCard
    }=require('../../controllers/colorCard');

//====Router====
//GET
getPriceRouter.get('/',getColorCard)
//POST
getPriceRouter.post('/',createColorCard)
//DELETE 
getPriceRouter.delete('/',deleteColorCard)
//PUT
getPriceRouter.put('/',updateColorCard)

module.exports = getPriceRouter;