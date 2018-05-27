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

  getAnalyser() {
    return audioCtx.createAnalyser();
  },

  decodeAudioData(audioData) {
    audioCtx.decodeAudioData(audioData).then(function(decodedData) {
      // use the decoded data here
      return decodedData;
    });
  }

}

export default AudioContext;