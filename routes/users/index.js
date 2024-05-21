const express = require('express');
const usersRouter = express.Router();
const usersVal = require('../../validation/usersValidation');
// authenticateOwner 
const authenticateOwner = require('../../middlewares/ownerMid/ownerLoginMiddlewares');
// import controller
const cors = require('cors')
const AuthIpAddress = require('../../config/IPControllerConfig');
const {
    getUsers,
    createUsers,
    deleteUsers,
    }=require('../../controllers/users');  

//====Router====
//GET
usersRouter.get('/',cors(AuthIpAddress),authenticateOwner,getUsers);
//POST
usersRouter.post('/',cors(AuthIpAddress),usersVal(),createUsers);
//DELETE 
usersRouter.delete('/:id',cors(AuthIpAddress),authenticateOwner,deleteUsers);


module.exports = usersRouter;