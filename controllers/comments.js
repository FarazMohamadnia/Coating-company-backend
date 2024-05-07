const CommentModel = require('../models/commentsModel')
const { validationResult }=require('express-validator');


const getComments = (async(req, res) => {
    try{
    const comments =await CommentModel.find();
    if(!comments)return res.status(402).json({
        data : 'null',
        message: 'error',
        error: 'users not found'
    });
    res.status(201).json({
        data : comments,
        message : 'ok',
    });
    }catch(err){
        res.status(501).json({
            message:'error',
            error : err.message
        })
    }
});

const createComments =(async(req , res)=>{
    try{
    const {title , text }= req.body;
    const validation = validationResult(req);
    if(!validation.isEmpty())return res.status(404).json({
        data : 'null',
        message : 'error',
        error : validation.array()
    });

    const comments = new CommentModel({
        title : title,
        text : text,
    });

    const saveComments = await comments.save();
    if(saveComments)return res.status(201).json({
        data: saveComments,
        message:'ok'
    })


    }catch(err){
        return res.status(501).json({
            data : 'null',
            message : 'error',
            error : err.message
        })
    }
});

const deleteComments =(async(req , res)=>{
    try{
        const id = req.params.id
        const deleteComments =await CommentModel.findByIdAndDelete(id);
        if(!deleteComments) return res.status(404).json({
            message:'error',
            error : 'id is not valid'
        });
        if(deleteComments)return res.status(201).json({
            data : deleteComments,
            message : 'The comment was successfully deleted',
        });
        
    }catch(err){
        res.status(501).json({
            message : 'error',
            error: err.message
        })
    }

});

const updateComments =(async(req , res)=>{
    const {rptitle , rptext } = req.body;
    const Id= req.params.commentid;
    try{
        const commentId = await CommentModel.findById(Id);
        if(!commentId)return res.status(404).json({
            data : 'null',
            message : 'error',
            error : 'this comment is not valid'
        });

        commentId.replies.push({
            rptitle:rptitle,
            rptext : rptext
        });
        const savecomments = await commentId.save();
        if(!savecomments) return res.status(404).json({
            message : 'error',
            error : 'Comment was not registered'
        });
        res.status(201).json({
            data : commentId ,
            message : 'ok'
        })


    }catch(err){
        res.status(502).json({
            message:'error',
            error: err.message
        })
    }
});


const deleterepliesComments = (async(req , res)=>{
        const commentsId = req.params.commentid;
        const repliesid = req.params.repliesid;
        
        try{
            const findcomment =  await CommentModel.findById(commentsId);
            if(!findcomment) return res.status(404).json({
                message: 'error',
                error : 'this comment is not valid'
            });
            if(!repliesid) return res.status(404).json({
                message: 'error',
                error : 'this replies comment is not valid'
            });

            findcomment.replies = findcomment.replies.filter(replies => replies.id !== repliesid);

            const saveData = await findcomment.save()
            if(!saveData)return res.status(404).json({
                message : 'error',
                error : 'Comment was not registered'
            });
            res.status(201).json({
                data : saveData,
                message : 'ok'
            })
        }catch(err){
            res.status(502).json({
                data : 'null',
                message:'error',
                error : err.message
            })
        }
        
})

module.exports = {
    getComments,
    createComments,
    deleteComments,
    updateComments,
    deleterepliesComments
}