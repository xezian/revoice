import AudioContext from './AudioContext';
import reverseBuffer from 'reversebuffer';

const audioCtx = AudioContext.getAudioContext();

const readMyFile = (blob) => {
    return new Promise((res, rej)=>{
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            res(fileReader.result);
        };
        fileReader.onerror = (err) => {
            rej(err);
        };
        fileReader.readAsArrayBuffer(blob);
    })
};

const sendToDecoder = (blob) => {
    return new Promise((res,rej) => { 
        readMyFile(blob).then(aBuff=>{
            AudioContext.decodeAudioData(aBuff).then(decoded=>{
                res(decoded);
            }).catch(err=>{
                rej(err);
            });
        });    
    })
};

const reverseThisBlob = (blob) => {
    return new Promise((res,rej) => { 
        sendToDecoder(blob).then((decoded) => {
            reverseBuffer({
                buffer: decoded,
                context: audioCtx,
            });
            res(reverseBuffer(decoded));
        }).catch(err=>{
            rej(err);
        });  
    });
};

const ReverseTheBlobInThisObject = (blobObj) => {
    return new Promise((res, rej) => {
        reverseThisBlob(blobObj.blob).then(revBuff => {
            res(revBuff);
        }).catch(err=>{
            rej(err);
        })
    })
};

export default ReverseTheBlobInThisObject;

