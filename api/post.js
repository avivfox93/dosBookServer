
const Post = require('../entities/Post');
const Comment = require('../entities/Comment');

const createPost = async(req,res)=>{
    try{
        const post = new Post(req.body.post);
        await post.save();
        res.send({id:post._id});
    }catch(error){
        res.status(401).send({error:error});
    }
}

const getPosts = async(req,res)=>{
    try{
        var user = res.locals.user;
        user.friendsId.push(user._id);
        console.log('USER: ' + user);
        const posts = await Post.find().limit(50).where('userProfile').in(user.friendsId)
            .where('date').lte(req.body.date).limit(50).sort('date')
            .populate({path:'userProfile pictures comments',
                        populate:
                            {path:'safeSearch profilePic userProfile', populate: {path: 'safeSearch profilePic'}}
                        });
        res.send({posts:posts});
        console.log('POSTS: ' + posts);
    }catch(error){
        console.error(error);
        res.status(401).send({error:error});
    }
}

module.exports = {createPost: createPost, getPosts: getPosts};