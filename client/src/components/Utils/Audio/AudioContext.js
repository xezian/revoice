const audioCtx = whichAudioContext();

function whichAudioContext() {
  if (window.AudioContext) {
    return new window.AudioContext();
  } else if (window.webkitAudioContext) {
    return new window.webkitAudioContext();
  } else {
    return 'browser not supported';
  }
}

const AudioContext  = {

  getAudioContext() {
    return audioCtx;
  },

  decodeAudioData(audioData) {
    return new Promise((res, rej) => {
      audioCtx.decodeAudioData(audioData).then(function(decodedData) {
        // use the decoded data here
        res(decodedData);
      }).catch(err=>{
        rej(err);
      });
    })
  }
}

export default AudioContext;