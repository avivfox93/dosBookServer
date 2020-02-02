
const User = require('../entities/User');
const Comment = require('../entities/Comment');

const postComment = async(req,res)=>{
    try{
        let c = JSON.parse(req.body.comment);
        c.userProfile = undefined;
        c.userProfile = res.locals.user._id;
        const comment = new Comment(p);
        await comment.save();
        res.send({id:comment._id});
    }catch(error){
        console.error(error);
        res.status(401).send({error:error});
    }
}

module.exports = {postComment: postComment};