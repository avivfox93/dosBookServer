
var admin = require('firebase-admin');

const auth = async(req,res,next)=>{
    try{
        const decodedToken = await admin.auth().verifyIdToken(req.body.token);
        if(!decodedToken)
            throw 'Auth Failed!';
        req.uid = decodedToken.uid;
        return next();
    }catch(err){
        req.status(401).send({error:err});
    }
}

module.exports = auth