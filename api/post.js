
const Post = require('../entities/Post');
const Comment = require('../entities/Comment');
const ObjectID = require('mongodb').ObjectID;

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

const getPostsFromProfile = async(req,res)=>{
    try{
        const user = JSON.parse(req.body.profile);
        const posts = await Post.find().where('userProfile').in(user.friendsId)
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

const getPosts = async(req,res)=>{
    try{
        user = res.locals.user;
        user.friendsId.push(user._id);
        const posts = await Post.find().where('userProfile').in(user.friendsId)
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

module.exports = {createPost: createPost, getPosts: getPosts, getPostsFromProfile: getPostsFromProfile};