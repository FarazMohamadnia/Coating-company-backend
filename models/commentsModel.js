const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength:150,
    minlength:3
  },
  text: {
    type: String,
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
            maxlength:150,
            minlength:0
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
