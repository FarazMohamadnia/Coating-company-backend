const mongoose = require('mongoose');
const { isEmail } = require('validator');


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength :3,
    maxlength :30,
    required: true
  },
  lastName: {
    type: String,
    minlength :3,
    maxlength :40,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail,'Email is not valid']
  },
  phoneNumber: {
    type: String,
    minlength :8,
    maxlength :14,
    required: true,
    unique: true,
  },
  jobDescription : {
    type : String,
    trim: true,
  },
  details:[{
    quantity : {
      type : Number,
      maxlength : 1000000,
      minlength : 0,
      default : 0
    },
    color : {
      type : String,
      maxlength : 100,
      default : 'No color'
    },
    dimensions :{
      type : String,
      default : '0'
    },
    weight :{
      type : Number,
      default : 0 
    },
    photo :{
      type:String 
    }
  }]
});


const UserModels = mongoose.model('User', userSchema);

module.exports = UserModels;
