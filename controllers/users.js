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
    const {firstName , lastName , email , phoneNumber , jobDescription , details }= req.body;
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
                quantity: details.quantity
            }]
        });



        const savedUser = await newUser.save();

        res.status(201).json({
            data:savedUser,
            message: 'ok'
        });

    }catch(err){
        res.status(500).json({
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
    console.log(userId)

    try {
        const deletedUser = await UserModels.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ 
                data: 'null',
                message: "User not found" 
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