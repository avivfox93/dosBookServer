
const User = require('../../entities/User');
var admin = require('firebase-admin');

const auth = async(req,res,next)=>{
    let token = req.body.token
    try{
        const decodedToken = await admin.auth().verifyIdToken(token);
        if(!decodedToken)
            throw 'Auth Failed!';
        try{
            req.locals.user = await User.find({uid:decodedToken.uid});
        }catch(error){
            console.error(error);
        }
        res.locals.uid = decodedToken.uid;
        return next();
    }catch(err){
        console.error(err + '\n' + 'cannot auth: ' + JSON.stringify(req.body));
        res.status(401).send({error:err});
    }
}

module.exports = auth;