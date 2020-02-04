
const Post = require('../entities/Post');
const Comment = require('../entities/Comment');

const createPost = async(req,res)=>{
    try{
        let p = JSON.parse(req.body.post);
        p.userProfile = undefined;
        p.userProfile = res.locals.user._id;
        console.log('wallak ' + p.userProfile);
        const post = new Post(p);
        await post.save();
        res.send({id:post._id});
    }catch(error){
        console.error(error);
        res.status(401).send({error:error});
    }
}

const getPosts = async(req,res)=>{
    try{
        var user = req.body.profile;
        if(!user){
            user = res.locals.user;
            user.friendsId.push(user._id);
        }
        else
            user.friendsId = [user._id];
        console.log('****\n' + user);
        console.log('USER: ' + user);
        const posts = await Post.find().limit(50).where('userProfile._id').in(user.friendsId)
            .where('date').lte(req.body.date).limit(50).sort({date:-1})
            .populate({path:'userProfile pictures comments comments.userProfile',
                populate:{path:'safeSearch profilePic userProfile userProfile.safeSearch',
                populate: {path: 'safeSearch profilePic',
                populate: {path: 'safeSearch'}}
            }
        });
        res.send({posts:posts});
        console.log('POSTS: ' + posts);
    }catch(error){
        console.error(error);
        res.status(401).send({error:error});
    }
}

module.exports = {createPost: createPost, getPosts: getPosts};