const UserModels = require("../models/usersModels");
const{validationResult}=require('express-validator')

const getUsers = (async(req, res) => {
    try {
        const users = await UserModels.find();
        if(!users)return res.json({
            data:'null',
            message : 'Error',
            error:'There is no user'
        })
        res.status(200).json({
            data:users,
            message: 'ok'
        }); 
    } catch (err) {
        res.status(500).json({ 
            data: 'null',
            message:'Error',
            error: err.message 
        });
    } 
});

const createUsers =(async(req , res)=>{
    const {firstName , lastName , email , phoneNumber , jobDescription }= req.body;
    const {quantity , color , dimensions , weight , photo}=req.body.details[0]
    const ValResult = validationResult(req);
    if(!ValResult.isEmpty())return res.json({
        data :'null',
        message:'Error',
        error : ValResult.array()
    });
    try{
        const newUser =new UserModels({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            jobDescription:jobDescription,
            details:[{
                quantity: quantity ,
                color : color ,
                dimensions : dimensions ,
                weight : weight ,
                photo : photo 
            }]
        });
        const savedUser = await newUser.save();

        return res.status(201).json({
            data:savedUser,
            message: 'ok'
        });

    }catch(err){
        return res.status(500).json({
            data:'null',
            message: 'Error',
            error : err.message
        });
    }


});

const deleteUsers =(async(req , res)=>{
    const userId = req.params.id;
    if(!userId)return res.status(401).json({
        data:'null',
        message: 'Id Error ...',
    })

    try {
        const deletedUser = await UserModels.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ 
                data: 'null',
                message: "Error" ,
                error : "User not found"
            });
        }

        res.status(200).json({
            data : deletedUser,
            message: "User deleted successfully" 
        });
    } catch (err) {
        res.status(500).json({
            data:'null',
            message: 'Error',
            error : err.message
        });
    }

});




module.exports = {
    getUsers,
    createUsers,
    deleteUsers,
}