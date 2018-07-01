import AudioContext from './AudioContext';
import reverseBuffer from 'reversebuffer';

let arrayBuffer;
const fileReader = new FileReader();
const audioCtx = AudioContext.getAudioContext();

fileReader.onloadend = () => {
    arrayBuffer = fileReader.result;
};

const readMyFile = (blob) => {
    return new Promise((res, rej)=>{
        fileReader.readAsArrayBuffer(blob);
        setTimeout(()=>{
            if(arrayBuffer){
                res(arrayBuffer);
            }else{
                rej("not readable");
            }
        }, 5000)
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
            let revBuff = reverseBuffer({
                buffer: decoded,
                context: audioCtx,
            });
            revBuff = reverseBuffer(decoded);
            setTimeout(()=>{
                if(revBuff){
                    res(revBuff);
                }else{
                    rej("not readable");
                }
            }, 2000);
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

