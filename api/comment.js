
const User = require('../entities/User');
const Post = require('../entities/Post');
const Comment = require('../entities/Comment');

const postComment = async(req,res)=>{
    try{
        console.log(req.body);
        let c = req.body.comment;
        c.userProfile = undefined;
        c.userProfile = res.locals.user._id;
        const comment = new Comment(p);
        await comment.save();
        const post = Post.findById(req.body.post_id);
        post.comments.push(comment._id);
        await post.save();
        res.send({id:comment._id});
    }catch(error){
        console.error(error);
        res.status(401).send({error:error});
    }
}

module.exports = {postComment: postComment};