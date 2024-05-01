const express = require('express');
const app = express();
const commentsRouter = express.Router();
const {
    getComments,
    createComments,
    deleteComments,
    }=require('../../controllers/comments')

//====Router====
// GET
commentsRouter.get('/',getComments)
//POST
commentsRouter.post('/',createComments)
//DELETE 
commentsRouter.delete('/',deleteComments)


module.exports = commentsRouter;