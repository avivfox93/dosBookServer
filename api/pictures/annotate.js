
// import '@tensorflow/tfjs-node';
import * as faceapi from 'face-api.js';
import { post } from 'axios';
const SafeSearch = require('../../entities/SafeSearch');

const annotate = async(image)=>{
    const postData = {
        requests:{
            image : {content: image},
            features:[{
                type:'FACE_DETECTION',
                maxResults:10
                },
                {type: 'SAFE_SEARCH_DETECTION'},
                {type: 'FACE_DETECTION'}
            ]
        }
    };
    var resp = {};
    try{
        resp = await post('https://vision.googleapis.com/v1/images:annotate?key=' + process.env.GOOGLE_API_KEY,postData);
    }catch(err){
        console.log(err);
        return resp;
    }
    let params = resp.data.responses[0].safeSearchAnnotation
    
    params.man = 'VERY_UNLIKELY';params.woman = 'VERY_UNLIKELY';
    const obj = new SafeSearch(params);
    obj.save();
    return obj;
}

export default annotate;