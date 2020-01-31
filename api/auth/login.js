

const User = require('../../entities/User');


const login = async (req,res)=>{
    const phone = req.body.phone;

    try{
        console.log('looking for: ' + phone);
        const user = await User.findOne({phone: phone});
        if(!user)
            throw 'new user';
        console.log(JSON.stringify(user) + '\nAuthenticated!')
        res.send({user:JSON.stringify(user)});
    }catch(err){
        res.send({new_user:true});
    }
}

module.exports = login;