

import { Schema, Types, model } from 'mongoose';

const PictureSchema = new Schema({
    url:{
        type: String,
        required: true
    },
    safeSearch:{
        type: Types.ObjectId,
        required: true,
        ref: 'SafeSearch'
    }
  });

  module.exports = model('Picture', PictureSchema);
