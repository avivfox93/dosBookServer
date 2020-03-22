
require('dotenv').config();
var crypto = require("crypto");
var admin = require('firebase-admin');
const login = require('./api/auth/login');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const annotate = require('./api/pictures/annotate');
const post = require('./api/post');
const https = require('https');
const fs = require('fs');
const profiles = require('./api/profiles');
const auth = require('./api/auth/authenticate');
const Picture = require('./entities/Picture');
const comment = require('./api/comment');

const privateKey = fs.readFileSync('/etc/letsencrypt/live/dosbook.tk/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/dosbook.tk/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/dosbook.tk/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

app.use(express.json({limit:'50mb'}));

app.post('/api/auth/login',auth,login);

app.post('/api/profiles',auth,profiles.register);

// app.get('/api/profiles',auth,profiles.get);

app.post('/api/get_profiles',auth,profiles.get);

app.post('/api/request',auth,profiles.request);

app.post('/api/approve_request',auth,profiles.approveRequest);

app.post('/api/upload',async(req,res)=>{
    const image = req.body.data;
    const safe = await annotate(image);
    if(!safe){
        res.status(401).send({error:'Picture is not modest!'});
        return;
    }
    var base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
    let r = '';
    do{
        r = crypto.randomBytes(10).toString('hex');
    }while(require("fs").existsSync('./photos/' + r + '.jpg'));
    
    require("fs").writeFile('photos/' + r + '.jpg', base64Data, 'base64', function(err) {
        if(!err){
            const result = {url:r + '.jpg',safeSearch:safe};
            const picture = new Picture(result);
            picture.save();
            result._id = picture._id;
            res.send(result);
            return;
        }
        console.log(err);
        res.status(500).send({error:err});
    });
});

app.post('/api/set_gender_filter',auth,profiles.showOppositeGenders);

app.post('/api/find_profiles',auth,profiles.findProfiles);

app.post('/api/get_profile_posts',auth,post.getPostsFromProfile);

app.post('/api/get_friends_req',auth,profiles.getFriendRequests);

app.post('/api/set_profile',auth,profiles.setProfilePicture);

app.post('/api/set_profile_name',auth,profiles.setProfileName);

app.post('/api/get_posts',auth,post.getPosts);

app.post('/api/post',auth,post.createPost);

app.post('/api/comment',auth,comment.postComment);

app.get('/api/photo/:file(*)',(req,res)=>{
    const fileName = req.params.file;
    console.log('___PHOTO___ ' + fileName);
    res.sendFile(__dirname  + '/photos/' + fileName);
});

app.get('/api/ota/:file(*)',(req,res)=>{
    console.log('GET');
    const fileName = req.params.file;
    res.sendFile(__dirname  + '/ota/' + fileName);
});

app.post('/api/ota/:file(*)',(req,res)=>{
    console.log('POST got body: ' + req.body);
    const fileName = req.params.file;
    res.sendFile(__dirname  + '/ota/' + fileName);
});

admin.initializeApp({
    credential: admin.credential.cert('token.json'),
    databaseURL: "https://dosbook-45989.firebaseio.com"
});

const httpsServer = https.createServer(credentials,app);
httpsServer.listen(process.env.PORT,()=>{console.log('HTTPS Server running on port 443');});
// app.listen(process.env.PORT, () => console.log('server started'));
