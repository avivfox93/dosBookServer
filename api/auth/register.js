

import User, { findOne } from '../../entities/User';


const login = async (req,res)=>{
    const phone = req.body.phone;

    try{
        const user = await findOne({phone: phone});
        if(user)
            throw 'User Exist!';
        let temp = req.body.user;
        temp.token = req.body.token;
        user.uid = res.locals.uid;
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