
const Post = require('../entities/Post');

const createPost = (req,res)=>{
    try{
        const post = new Post(req.body.post);
        await post.save();
        res.send({id:post._id});
    }catch(error){
        res.status(401).send({error:error});
    }
}

const getPosts = (req,res)=>{
    try{
        const posts = await Post.find().limit(50).where('_id').in(req.body.posts)
            .populate({path:'userProfile pictures comments',
                        populate:
                            {path:'safeSearch profilePic userProfile', populate: {path: 'safeSearch profilePic'}}
                        });
        req.send({posts})
    }catch(error){
        res.status(401).sennd({error:error});
    }
}

module.exports = {createPost: createPost};