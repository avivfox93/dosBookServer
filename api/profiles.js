
const User = require('../entities/User');
const jwt = require('jsonwebtoken')

const register = (req,res)=>{
    try {
        let user = new User(req.body.profile);
        user.save();
        res.send({token : jwt.sign(user,process.env.JWT_KEY)});
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' });
    }
}

const get = async(req,res)=>{
    const profiles = await User.find().where('_id').in(req.body.profiles)
        .select('phone fName lName gender dob friendsId profilePic').populate({
            path: 'profilePic'
,           populate: {
                path: 'safeSearch'
            }
        }).exec();

}

module.exports = {register : register};