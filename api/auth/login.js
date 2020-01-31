

const findOne = require('../../entities/User');


const login = async (req,res)=>{
    const token = req.body.token;

    try{
        console.log('looking for: ' + req.body.token);
        const user = await findOne({token: token});
        if(!user)
            throw 'new user';
        console.log(JSON.stringify(user) + '\nAuthenticated!')
        res.send({user:JSON.stringify(user)});
    }catch(err){
        res.send({new_user:true});
    }
}

module.exports = login;