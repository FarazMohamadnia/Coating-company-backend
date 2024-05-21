const express = require('express');
const getPriceRouter = express.Router();
const ColorVal = require('../../validation/colorValidation');
//cors package for Auth 
const cors = require('cors');
const AuthIpAddress = require('../../config/IPControllerConfig');
// authenticateOwner
const authenticateOwner = require('../../middlewares/ownerMid/ownerLoginMiddlewares');

const {
    getColorCard,
    createColorCard,
    deleteColorCard,
    updateColorCard
    }=require('../../controllers/colorCard');

//====Router====
//GET
getPriceRouter.get('/',cors(AuthIpAddress),getColorCard)
//POST
getPriceRouter.post('/',cors(AuthIpAddress),authenticateOwner,ColorVal(),createColorCard)
//DELETE 
getPriceRouter.delete('/:id',cors(AuthIpAddress),authenticateOwner,deleteColorCard)
//PUT
getPriceRouter.put('/:id',cors(AuthIpAddress),authenticateOwner,updateColorCard)

module.exports = getPriceRouter;