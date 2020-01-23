
// import '@tensorflow/tfjs-node';
import * as faceapi from 'face-api.js';
import { post } from 'axios';
const SafeSearch = require('../../entities/SafeSearch');

const annotate = async(image)=>{
    const postData = {
        requests:{
            image : {content: image},
            features:[
                {type: 'SAFE_SEARCH_DETECTION'},
                {maxResults: 5,type: 'LABEL_DETECTION'}
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
    console.log('responses: ' + JSON.stringify(resp.data));
    let safeSearchAnnotation = resp.data.responses[0].safeSearchAnnotation;
    let labelAnnotations = resp.data.responses[0].labelAnnotations;
    let modest = true;
    labelAnnotations.forEach(annotate=>{
        switch(annotate.description){
            case 'Bikini':
                if(annotate.score >= 0.5){
                    modest = false;
                    break;
                }
                break;
            case 'Swimsuit bottom':
                if(annotate.score >= 0.5){
                    modest = false;
                    break;
                }
                break;
            case 'Brassiere':
                if(annotate.score >= 0.5){
                    modest = false;
                    break;
                }
                break;
        }
    });
    if(!modest)
        return undefined;
    switch(safeSearchAnnotation){
        case 'POSSIBLE':
        case 'LIKELY':
        case 'VERY_LIKELY':
            modest = false;
            break;
    }
    safeSearchAnnotation.man = 'VERY_UNLIKELY';safeSearchAnnotation.woman = 'VERY_UNLIKELY';
    const obj = new SafeSearch(safeSearchAnnotation);
    obj.save();
    return obj;
}

export default annotate;