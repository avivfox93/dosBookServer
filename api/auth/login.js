

const User = require('../../entities/User');


const login = async (req,res)=>{
    const uid = req.uid;

    try{
        console.log('looking for: ' + uid);
        const user = await User.findOne({uid: uid}).populate('profilePic');
        if(!user)
            throw 'new user';
        console.log(JSON.stringify(user) + '\nAuthenticated!')
        res.send({user:JSON.stringify(user)});
    }catch(err){
        res.send({new_user:true});
    }
}

module.exports = login;