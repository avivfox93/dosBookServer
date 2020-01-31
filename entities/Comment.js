

import { Schema, Types, model } from 'mongoose';

const CommentSchema = new Schema({
    userProfile:{
        type: Types.ObjectId,
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

  module.exports = model('Comment', CommentSchema);
