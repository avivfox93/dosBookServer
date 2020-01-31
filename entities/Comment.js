

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    userProfile:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required:true,
        default:Date.now
    }
  });

  module.exports = mongoose.model('Comment', CommentSchema);
