
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
        // console.log('WALLAK ' + JSON.stringify(profiles));
    res.send({profiles: profiles});
}

const findProfiles = async(req,res)=>{
    // console.log('WALLAKKKK GOT: fName: ' + req.body.fName + ' lName: ' + req.body.lName);
    const fName = req.body.fName;
    const lName = req.body.lName.length > 0 ? req.body.lName : "*";
    try{
        const profiles = await User.find({$and:[{fName: {$regex: fName}},{lName:{$regex: lName}}]})
            .select('phone fName lName gender dob friendsId profilePic').populate({
                path: 'profilePic',
                populate: {
                    path: 'safeSearch'
                }
            }).exec();
        res.send({profiles: profiles});
    }catch(error){
        console.error(error);
        res.status(403).send({error:error});
    }
}

const request = async(req,res)=>{
    const user = res.locals.user;
    try{
        const friend = await User.findById(req.body.profile);
        if(!friend)
            throw 'Profile not found!';
        user.outFriendReq.push(friend);
        friend.inFriendReq.push(user);
        await user.save();
        await friend.save();
    }
    catch(error){
        console.error(error);
        res.status(403).send({error:error});
    }
}

const approveRequest = async(req,res)=>{
    const user = res.locals.user;
    try{
        const friend = await User.findById(req.body.profile);
        if(!friend)
            throw 'Profile not found!';
        friend.outFriendReq.filter(item => item !== user._id);
        user.inFriendReq.filter(item => item !== friend._id);
        if(!user.friendsId.includes(friend._id))
            user.friendsId.push(friend._id);
        if(!friend.friendsId.includes(user._id))
            friend.friendsId.push(user._id);
        await user.save();
        await friend.save();
        res.status(200).send();
    }catch(error){
        console.error(error);
        res.status(403).send({error:error});
    }
}

module.exports = {register : register, get : get, findProfiles : findProfiles,
     request : request, approveRequest : approveRequest};