
const Post = require('../entities/Post');

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
        console.log('USER: ' + user);
        user.friendsId.push(user._id);
        const posts = await Post.find().limit(50).where('userProfile').in(user.get('friendsId'))
            .where('date').lte(req.body.date).limit(50)
            .populate({path:'userProfile pictures comments',
                        populate:
                            {path:'safeSearch profilePic userProfile', populate: {path: 'safeSearch profilePic'}}
                        });
        res.send({posts:posts})
    }catch(error){
        console.error(error);
        res.status(401).send({error:error});
    }
}

module.exports = {createPost: createPost, getPosts: getPosts};