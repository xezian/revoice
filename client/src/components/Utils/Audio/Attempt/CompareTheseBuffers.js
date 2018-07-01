import DTW from 'dtw';
// import DTW from 'dynamic-time-warping';
import reverseBuffer from 'reversebuffer';
import AudioContext from '../Context/AudioContext';
import API from '../../API/API';

// core function exported at bottom relies on all other functions here
const CompareTheseBuffers = (revBuff, url, id) => {
    return new Promise((res, rej) => {
        getBuff(url).then(resBuff => {
            compareBuffs(resBuff, revBuff).then(score => {
                console.log('dtw score: ' + score);
                getClip(id).then(clipObj => {
                    compareScores(clipObj, score).then(success => {
                        if(success.success){ 
                            res(success);
                        } else {
                            res('sorry, sonny, a score of ' + success.score + ' is just not excellent enough');
                        }
                    }).catch(err=> rej(err));
                }).catch(err => rej(err));
            }).catch(err => rej(err));
        }).catch(err => rej(err));
    })
}

// check the score against all scores and store if better than top 3
const compareScores = (clipObj, score) => {
    return new Promise((res) => {
        API.getThree(clipObj._id).then(results => {
            let successObj = {
                success: false,
                score: score
            }
            if(results.data.length < 3){
                successObj.success = true;
            } else {
                for(let i = 0; i < results.data.length; i++){
                    if(score < results.data[i].score){
                        successObj.success = true;
                    }
                }
            }
            res(successObj);
        })
    })
}

// reduces the size of the arrays for comparison
const sampleArr = (arr) => {
    return new Promise((res, rej) => {
        const sampled = arr.filter((oneBit, inx) => {
            return (inx%9 === 0 && !isNaN(oneBit));
        });
        Promise.all([...sampled]).then(() => {
            res(sampled);
        }).catch(err => rej(err));
    })
}

// result of this function is a score of similar-ness
function compareBuffs(originalBuff, newTryBuff) {
    return new Promise((res, rej) => {
        const orig = originalBuff.getChannelData(0);
        const newTry = newTryBuff.getChannelData(0);
        const origArr = Array.prototype.slice.call(orig);
        const newTryArr = Array.prototype.slice.call(newTry);
        sampleArr(origArr).then(origVals => {
            sampleArr(newTryArr).then(newTryVals => {
                const dtw = new DTW();
                res(dtw.compute(origVals, newTryVals));
            }).catch(err => rej(err));
        }).catch(err => rej(err));
    })
}

// function to make (and reverse) the orginal buffer from the url pointing to the aws resource
const getBuff = (url) => {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                AudioContext.decodeAudioData(xhr.response).then(result => {
                    let audioCtx = AudioContext.getAudioContext();
                    reverseBuffer({
                        buffer: result,
                        context: audioCtx,
                    });
                    res(reverseBuffer(result));
                }).catch(err => rej(err));
            }
        }, false);
        xhr.send();
    })
}

// API call to retrieve clip
const getClip = (id) => {
    return new Promise((res, rej) => {
        API.getOne(id).then(obj => {
            res(obj.data);
        }).catch(err => {rej(err)});
    })
}

// ultimately export one function
export default CompareTheseBuffers;