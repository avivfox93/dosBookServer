
const google = require('googleapis');
const findOne = require('../../entities/User');


const login = async (req,res)=>{
    const token = req.body.token;

    try{
        const user = await findOne({token: token});
        if(!user)
            throw 'new user';
        res.send({user:JSON.stringify(user)});
    }catch(err){
        res.send({new_user:true});
    }
}

module.exports = login;