const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength:250,
    minlength:5
  },
  text: {
    type: String,
    maxlength:4000,
    minlength:5,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  replies: [
    {
        rptitle:{
            type : String ,
        },
        rptext:{
            type : String ,
        },
        rpcreatedAt:{
          type:Date,
          default:Date.now
        }
    }
  ]
});


const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;
