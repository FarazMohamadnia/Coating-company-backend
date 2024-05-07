const ColorModel = require('../models/DataColor');
const {validationResult} = require('express-validator');
const getColorCard = (async(req, res) => {
    try{
        const findColorData =await ColorModel.find();
        if(!findColorData)return res.status(404).json({
            data : 'null',
            message: 'error',
            error : 'card data is not found'
        });
        res.status(201).json({
            data : findColorData ,
            message : 'ok'
        });
    }catch(err){
        res.status(501).json({
            data : 'null',
            message: 'error',
            error : `server error :: ${err.message}`
        });

    }
});

const createColorCard =(async(req , res)=>{
    const {title , description , Photo , type , colorCode} = req.body;
    const validation  = validationResult(req);
    try{
        if(!validation.isEmpty())return res.status(404).json({
            data : 'null',
            message : 'error',
            error : validation.array()
        });
    
        const saveCardData = new ColorModel({
            title:title,
            description : description,
            type : type,
            colorCode : colorCode,
            Photo : Photo
        });
    
        const saveData =await saveCardData.save();
    
        if(!saveData)return res.status(404).json({
            data : 'null',
            message : 'error',
            message : 'Data could not be registered successfully'
        });
        
        res.status(202).json({
            data :saveData ,
            message : 'ok'
        });

    }catch(err){
        res.status(501).json({
            data : 'null',
            message : 'error',
            error: err.message
        });
    }

});

const deleteColorCard =(async(req , res)=>{
    const Id = req.params.id;
    if(!Id)return req.status(404).json({
        data : 'null',
        message:'error',
        error : 'There is no entered ID'
    })
    try{
        const deletById =await ColorModel.findByIdAndDelete(Id);
        if(!deletById)return res.status(404).json({
            data : 'null',
            message:'error',
            error : 'this card Id is not valid'
        });
        res.status(202).json({
            data : deletById ,
            message : 'ok'
        })
    }catch(err){
        res.status(501).json({
            data : 'null',
            message:'error',
            error : `Server error :: ${err.message}`
        })
    }
});

const updateColorCard =(async(req , res)=>{
    const {title,description , Photo} = req.body ;
    const id = req.params.id
    try{
        const updateItem =await ColorModel.findByIdAndUpdate(id , {
            title:title,
            description:description,
            Photo: Photo
        });

        if(!updateItem)return res.status(404).json({
            data : null,
            message : 'error',
            error : 'this id is not valid'
        });
        res.status(202).json({
            data : updateItem ,
            message : 'ok'
        });

    }catch(err){
        res.status(505).json({
            data: 'null',
            message:'Error',
            error : `server error :: ${err.message}`
        })
    }
})



module.exports = {
    getColorCard,
    createColorCard,
    deleteColorCard,
    updateColorCard
}