import React, { Component } from 'react';
import Play from './Play';
import Playing from './Playing';
import Record from './Record';
import Recording from './Recording';
import ReverseTheBlobInThisObject from '../Context/ReverseThisBlob';

class Recorderator extends Component {

    constructor(props){
      super(props);
      this.state = {
        record: false,
        revBuff: null,
        isRecording: false,
        recordingState: null,
      }
    }

    componentDidMount() {
        this.setState({recordingState:"ready"})
        this.props.emojiState('🎙️');
    }

    startRecording= () => {
      this.setState({
        record: true,
        isRecording: true,
        revBuff: null
      });
    }
  
    stopRecording= () => {
      this.setState({
        record: false,
        isRecording: false
      });
    }
  
    onStart=() => {
      console.log('You can tap into the onStart callback');
      setTimeout(() => {
        console.log('stop time baby')
        this.stopRecording();
        this.setRecordingState("recorded");
      }, 3000);
    }
  
    onStop = (blobObject) => {
      console.log('stopped');
      console.log('behold, the blob object:');
      console.log(blobObject);
      ReverseTheBlobInThisObject(blobObject).then((revBuff)=>{
        console.log('behold, the reversed audio buffer:');
        console.log(revBuff);
        this.setState({
          revBuff : revBuff
        })
      });
    }

    setRecordingState = (which) => {
        this.setState({recordingState:which});
    }

    handleRecordingState = () => {
        let rtnVar;
        switch(this.state.recordingState){
        case "ready":
            rtnVar = <Record
                      handleRecord={this.setRecordingState}
                      />;
            break;
        case "recording":
            rtnVar = <Recording
                        startRecording={this.startRecording}
                        audioBitsPerSecond={this.props.audioBitsPerSecond}
                        onStart={this.onStart}
                        onStop={this.onStop}
                        record={this.state.record}
                      />;
            break;
        case "recorded":
            rtnVar = <Play
                      revBuff={this.state.revBuff}
                      handlePlay={this.setRecordingState}
                      />;
            break;
        case "playing":
            rtnVar = <Playing
                      revBuff={this.state.revBuff}
                      handlePlaying={this.setRecordingState}
                      handleSave={(id) => this.props.handleSave(id)}
                      haveClip={this.props.haveClip}
                      id={this.props.id}
                      url={this.props.url}
                      />;
            break;
        default:
            rtnVar = <h2>Unknown recordingState</h2>;
        }
        return rtnVar;
    }
    render(){
        return <div> {this.handleRecordingState()} </div>;
    }
};

export default Recorderator;