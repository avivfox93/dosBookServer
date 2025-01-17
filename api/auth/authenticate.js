
const User = require('../../entities/User');
var admin = require('firebase-admin');

const auth = async(req,res,next)=>{
    let token = req.body.token
    try{
        const user = await User.findOne({uid:req.body.token});
        if(!user){
            const decodedToken = await admin.auth().verifyIdToken(token);
            if(!decodedToken)
                throw 'Auth Failed!';
            try{
                res.locals.uid = decodedToken.uid;
                res.locals.user = await User.findOne({uid:decodedToken.uid});
                console.log('FOUND: ' + res.locals.user);
            }catch(error){
                console.error(error);
            }
            res.locals.uid = decodedToken.uid;
        }else{
            res.locals.user = user;
            res.locals.uid = token;
        }
        return next();
    }catch(err){
        console.error(err + '\n' + 'cannot auth: ' + JSON.stringify(req.body));
        res.status(401).send({error:err});
    }
}

module.exports = auth;