const express = require('express');
const commentsRouter = express.Router();
const CommentsVal = require('../../validation/commentsValidation');
//authenticateOwner
const authenticateOwner = require('../../middlewares/ownerMid/ownerLoginMiddlewares');
//cors Auth
const AuthIpAddress = require('../../config/IPControllerConfig');
const cors = require('cors'); 

const {
    getComments,
    createComments,
    deleteComments,
    updateComments,
    deleterepliesComments
    }=require('../../controllers/comments');

//====Router====
// GET
commentsRouter.get('/',cors(AuthIpAddress),getComments)
//POST
commentsRouter.post('/',cors(AuthIpAddress),CommentsVal(),createComments)
//DELETE 
commentsRouter.delete('/:id',cors(AuthIpAddress),authenticateOwner,deleteComments);
//PUT
commentsRouter.put('/:commentid',cors(AuthIpAddress),authenticateOwner,updateComments);
//DELETE REPLIES
commentsRouter.delete('/:commentid/replies/:repliesid',cors(AuthIpAddress),authenticateOwner,deleterepliesComments);


module.exports = commentsRouter;