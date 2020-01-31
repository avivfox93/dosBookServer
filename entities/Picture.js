

const mongoose = require('mongoose');

const PictureSchema = new mongoose.Schema({
    url:{
        type: String,
        required: true
    },
    safeSearch:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'SafeSearch'
    },
    modest:{
        type: Boolean
    }
  });

  module.exports = mongoose.model('Picture', PictureSchema);
