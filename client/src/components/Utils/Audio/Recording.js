import React, { Component }  from 'react';
import recblink from '../buttons/rec-blink.svg';
import { MicrophoneRecorder } from './MicrophoneRecorder';
import AudioContext from './AudioContext';

export default class Recording extends Component {
  constructor(props) {
    super(props);
    this.state = {
      analyser            : null,
      microphoneRecorder  : null,
    }
  }
  componentDidMount(){
    this.props.startRecording();
    const { onStart, onStop, audioBitsPerSecond, mimeType } = this.props;
    // start the recording
    const options = {
        audioBitsPerSecond : audioBitsPerSecond,
        mimeType           : mimeType
    };
    const analyser = AudioContext.getAnalyser();
    this.setState({
      analyser            : analyser,
      microphoneRecorder  : new MicrophoneRecorder(onStart, onStop, options),
    });
    setTimeout(() => function(){
      this.props.stopRecording();
      this.props.handleRecording("recorded");
    }, 3000);
  }
  render() {
    return (
      <img src={recblink} alt='recording' />
    );
  };
};