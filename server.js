
require('dotenv').config();
var crypto = require("crypto");

const login = require('./api/auth/login')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const annotate = require('./api/pictures/annotate').default;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

app.use(express.json());

app.post('/api/auth/login',login);

app.post('/api/upload',async(req,res)=>{
    const image = req.body.data;
    const safe = await annotate(image);
    var base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
    let r = crypto.randomBytes(10).toString('hex');
    require("fs").writeFile('photos/' + r + '.jpg', base64Data, 'base64', function(err) {
        if(!err){
            res.send({url:r + '.jpg',safeSearch:safe});
            return;
        }
        console.log(err);
        res.status(500).send({error:err});
    });
});

app.get('/api/photo',(req,res)=>{
    const fileName = req.query.name;
    res.sendFile(__dirname  + '/photos/' + fileName);
});

app.listen(process.env.PORT, () => console.log('server started'));
