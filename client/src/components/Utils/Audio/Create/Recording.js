import React, { Component }  from 'react';
import recblink from '../../buttons/rec-blink.svg';
import { MicrophoneRecorder } from '../Context/MicrophoneRecorder';

export default class Recording extends Component {
  constructor(props) {
    super(props);
    this.state = {
      microphoneRecorder  : null,
    }
  }
  componentDidMount(){
    this.props.startRecording();
    const { onStart, onStop, audioBitsPerSecond } = this.props;
    const options = {
        audioBitsPerSecond : audioBitsPerSecond,
        mimeType: 'audio/webm;codecs=opus'
    };
    this.setState({
      microphoneRecorder  : new MicrophoneRecorder(onStart, onStop, options),
    });
  }
  render() {
    const { record, onStop, onStart } = this.props;
    const { microphoneRecorder } = this.state;

    if(record) {
      if(microphoneRecorder) {
        console.log('recording.js start');
        microphoneRecorder.startRecording(onStart);
      }
      return <div>
              <img src={recblink} alt='recording' />
              <br/>
              LIVE
            </div>;
    } else {
      if (microphoneRecorder) {
        console.log('recording.js stop');
        microphoneRecorder.stopRecording(onStop);
      }
       return <div>stop time baby!</div>;
    }
  };
};