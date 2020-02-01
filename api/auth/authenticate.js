
const User = require('../../entities/User');
var admin = require('firebase-admin');

const auth = async(req,res,next)=>{
    try{
        let token = req.body.token
        const decodedToken = await admin.auth().verifyIdToken(token);
        if(!decodedToken)
            throw 'Auth Failed!';
        try{
            req.user = await User.find({uid:decodedToken});
        }catch(error){
            
        }
        req.uid = decodedToken.uid;
        return next();
    }catch(err){
        res.status(401).send({error:err});
    }
}

module.exports = auth;