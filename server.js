
require('dotenv').config();
var crypto = require("crypto");

const login = require('./api/auth/login')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const annotate = require('./api/pictures/annotate').default;
const https = require('https');
const fs = require('fs');

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

app.post('/api/auth/login',login);

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

const httpsServer = https.createServer(credentials,app);
httpsServer.listen(process.env.PORT,()=>{console.log('HTTPS Server running on port 443');});
// app.listen(process.env.PORT, () => console.log('server started'));
