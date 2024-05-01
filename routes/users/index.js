const express = require('express');
const app = express();
const usersRouter = express.Router();

const usersVal = require('../../validation/usersValidation');

// import controller
const {
    getUsers,
    createUsers,
    deleteUsers,
    
    }=require('../../controllers/users')

//====Router====
//GET
usersRouter.get('/',getUsers);
//POST
usersRouter.post('/',usersVal(),createUsers);
//DELETE 
usersRouter.delete('/:id',deleteUsers);


module.exports = usersRouter;