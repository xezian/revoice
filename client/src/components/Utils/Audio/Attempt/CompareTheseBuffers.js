import AudioContext from '../Context/AudioContext';
import API from '../../API/API';

const CompareTheseBuffers = (revBuff, url, id) => {
    return new Promise((res, rej) => {
        getBuff(url).then(resBuff => {
            console.log('resBuff!');
            console.log(resBuff);
            compareBuffs(resBuff, revBuff).then(score => {
                console.log('score!!');
                console.log(score);
                getClip(id).then(clipObj => {
                    compareScores(clipObj, score).then(success => {
                        if(success.success){ 
                            res(success);
                        } else {
                            rej('ahhhh nope');
                        }
                    })
                })
            })
        })
    })
}

const compareScores = (clipObj, score) => {
    return new Promise((res) => {
        console.log(clipObj);
        console.log(score);
        res({success: true, score: score});
    })
}

const compareBuffs = (originalBuff, newTryBuff) => {
    return new Promise((res, rej) => {
        const orig = originalBuff.getChannelData(0);
        const newTry = newTryBuff.getChannelData(0);
        console.log(orig);
        const score = orig.reduce((pre, cur, index) => {
            return Math.abs(cur - newTry[index]);
        }, 0);
        res(score);
    })
}

const getBuff = (url) => {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                AudioContext.decodeAudioData(xhr.response).then(result => {
                    res(result);
                }).catch(err => rej(err));
            }
        }, false);
        xhr.send();
    })
}

const getClip = (id) => {
    return new Promise((res, rej) => {
        API.getOne(id).then(obj => {
            res(obj.data);
        }).catch(err => {rej(err)});
    })
}

export default CompareTheseBuffers;