

import User, { findOne } from '../../entities/User';


const login = async (req,res)=>{
    const token = req.body.token;

    try{
        const user = await findOne({token: token});
        if(user)
            throw 'User Exist!';
        const newUser = new User(req.body.user);
        try{
            newUser.save();
        }catch(err){
            throw err;
        }
        res.send({user:JSON.stringify(user)})
    }catch(err){
        res.status(401).send({error:err});
        return;
    }
}

export default login