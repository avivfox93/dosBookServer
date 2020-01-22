

import { Schema as _Schema, Types, model } from 'mongoose';

const PostSchema = new _Schema({
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
    },
    pictures:[{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'Picture',
        required: true
    }],
    comments:[{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'Comment',
        required: true
    }]
  });

  export default model('Post', PostSchema);
