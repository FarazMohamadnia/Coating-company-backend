const express = require('express');
const app = express();
const storyRouter = express.Router();
const {
    getStory,
    createStory,
    deleteStory,
    updateStory
    }=require('../../controllers/Story')

//====Router====
//GET
storyRouter.get('/',getStory);
//POST
storyRouter.post('/',createStory);
//DELETE 
storyRouter.delete('/',deleteStory);
//PUT
storyRouter.put('/',updateStory);


module.exports = storyRouter;