
const User = require('../entities/User');

const register = (req,res)=>{
    try {
        req.body.profile._id = undefined;
        console.log('Register ' + req.body.profile.uid);
        let user = new User(req.body.profile);
        user.save();
        res.status(200).send({token: user.token});
    } catch (error) {
        console.error('ERROR!: ' + error);
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
    res.send({profiles: profiles});
}

const findProfiles = async(req,res)=>{
    console.log('WALLAKKKK GOT: fName: ' + req.body.fName + ' lName: ' + req.body.lName);
    const fName = req.body.fName;
    const lName = req.body.lName.length > 0 ? req.body.lName : "*";
    const profiles = await User.find({fName: {$regex: fName,lName:{$regex: lName}}})
        .select('phone fName lName gender dob friendsId profilePic').populate({
            path: 'profilePic',
            populate: {
                path: 'safeSearch'
            }
        }).exec();
    res.send({profiles: profiles});
}

module.exports = {register : register, get : get, findProfiles : findProfiles};