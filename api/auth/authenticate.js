
const User = require('../../entities/User');
var admin = require('firebase-admin');

const auth = async(req,res,next)=>{
    let token = req.body.token
    try{
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
        console.error(err + '\n' + 'cannot auth: ' + token);
        res.status(401).send({error:err});
    }
}

module.exports = auth;