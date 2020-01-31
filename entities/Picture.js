

import mongoose,{ Schema, model } from 'mongoose';

const PictureSchema = new Schema({
    url:{
        type: String,
        required: true
    },
    safeSearch:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'SafeSearch'
    }
  });

  module.exports = model('Picture', PictureSchema);
