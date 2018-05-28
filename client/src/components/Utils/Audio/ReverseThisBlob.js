import AudioContext from './AudioContext';

let arrayBuffer;
const fileReader = new FileReader();

fileReader.onloadend = () => {
    arrayBuffer = fileReader.result;
}

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
}

const ReverseThisBlob = (blobObj) => {
    return new Promise((res,rej) => { 
        readMyFile(blobObj.blob).then(aBuff=>{
            AudioContext.decodeAudioData(aBuff).then(decoded=>{
                console.log(decoded)
                res(blobObj);
            }).catch(err=>{
                rej(err);
            });
        });    
    })
}

export default ReverseThisBlob;