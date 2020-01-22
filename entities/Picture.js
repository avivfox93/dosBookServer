

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

  export default model('Picture', PictureSchema);
