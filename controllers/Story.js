const ImageModels = require("../models/StoryModels");
const{validationResult}=require('express-validator');

const getStory = (async(req, res) => {
    const Storys =await ImageModels.find(); 
    try{
        if(!Storys)return res.status(403).json({
            data : 'null',
            message : 'error',
            error : 'Storys list is empty'
        });
        return res.status(201).json({ 
            data : Storys,
            message : 'ok' 
        });
    }catch(err){
        res.status(501).json({
            data : 'null',
            message: 'error',
            error : err.message 
        })
    } 

});

const createStory =(async(req , res)=>{
    const validation = validationResult(req);
    if(!validation.isEmpty()) return res.json({
        message : 'error',
        error : validation.array()
    })
    const {image1 , image2} =req.body
    try {
        const image = new ImageModels({
            image1 : image1 ,
            image2 : image2
        });
        await image.save();
        res.status(201).json({
            data : image ,
            message : "Image uploaded successfully",
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}); 

const deleteStory =(async(req , res)=>{
    const ImageId = req.params.id;
    if(!ImageId) return res.status(401).json({
        message : 'error',
        error : 'There is no ID'
    })
    try{
    const deleteStory =await ImageModels.findByIdAndDelete(ImageId);

    if(!deleteStory)return res.status(404).json({
        data : 'null',
        message: 'error',
        error: 'This id does not exist (the story sent for deletion is wrong)'
    });
    return res.status(201).json({
        data : deleteStory,
        message : 'ok' 
    }); 
    }catch(err){ 
        res.status(501).json({
            data : 'null',
            message : 'error [The entered ID is probably wron]',
            error: err.message
        })
    }
})



module.exports = {
    getStory,
    createStory,
    deleteStory
}