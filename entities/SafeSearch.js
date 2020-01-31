

const mongoose = require('mongoose');

const posibility = ['VERY_UNLIKELY','UNLIKELY','POSSIBLE','LIKELY','VERY_LIKELY'];

const SafeSearchSchema = new mongoose.Schema({
    spoof:{
        type: String,
        enum: posibility,
        required: true
    },
    medical:{
        type: String,
        enum: posibility,
        required: true
    },
    adult:{
        type: String,
        enum: posibility,
        required: true
    },
    violence:{
        type: String,
        enum: posibility,
        required: true
    },
    man:{
        type: String,
        enum: posibility,
        required: true
    },
    woman:{
        type: String,
        enum: posibility,
        required: true
    }
  });

  module.exports =  mongoose.model('SafeSearch', SafeSearchSchema);
