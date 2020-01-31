
import mongoose,{ Schema, model } from 'mongoose';

const UserSchema = new Schema({
    phone: {
        type: String,
        required: true,
        minlength: 14,
        maxlength: 14
    },
    fName: {
      type: String,
      required: true
    },
    lName:{
        type: String,
        required: true
    },
    gender :{
        type: String,
        enum: ['MALE','FEMALE'],
        required: true
    },
    dob: {
      type: Date,
      required: true,
    },
    friendsId: [{
        type: mongoose.Types.ObjectId,
        default: [],
        ref: 'User'
    }],
    profilePic:{
        type: mongoose.Types.ObjectId, 
        ref: 'Picture'
    }
});

UserSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    return token;
}

module.exports = model('User', UserSchema);