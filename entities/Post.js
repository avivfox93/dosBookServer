

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
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
    },
    pictures:[{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'Picture',
        required: true
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: 'Comment',
        required: true
    }]
  });

  module.exports = mongoose.model('Post', PostSchema);
