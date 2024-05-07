const express = require('express');
const storyRouter = express.Router();
const StoryVal = require('../../validation/storyValidation');
//authenticateOwner
const authenticateOwner = require('../../middlewares/ownerMid/ownerLoginMiddlewares');
const cors = require('cors');
const AuthIpAddress = require('../../config/IPControllerConfig');
const {
    getStory,
    createStory,
    deleteStory,
    }=require('../../controllers/Story');
//====Router====
//GET
storyRouter.get('/',getStory); 
//POST
storyRouter.post('/',cors(AuthIpAddress),authenticateOwner,StoryVal(),createStory);
//DELETE 
storyRouter.delete('/:id',cors(AuthIpAddress),authenticateOwner,deleteStory);


module.exports = storyRouter;