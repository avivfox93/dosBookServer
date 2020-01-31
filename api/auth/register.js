

import User, { findOne } from '../../entities/User';


const login = async (req,res)=>{
    const phone = req.body.phone;

    try{
        const user = await findOne({phone: phone});
        if(user)
            throw 'User Exist!';
        let user = req.body.user;
        user.token = req.token;
        const newUser = new User(user);
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