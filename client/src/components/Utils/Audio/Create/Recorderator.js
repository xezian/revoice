import React, { Component } from 'react';
import Play from './Play';
import Playing from './Playing';
import Record from './Record';
import Recording from './Recording';
import ReverseTheBlobInThisObject from '../Context/ReverseThisBlob';

class Recorderator extends Component {
   
    state = {
        record: false,
        revBuff: null,
        msg: null,
        isRecording: false,
        recordingState: null,
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
      // 3 second recording time
      setTimeout(() => {
        this.stopRecording();
        this.setRecordingState("recorded");
      }, 3000);
    }
  
    onStop = (blobObject) => {
      ReverseTheBlobInThisObject(blobObject).then((revBuff)=>{
        this.setState({
          revBuff : revBuff
        })
      });
    }

    handleFail = (msg) => {
      this.setState({
        recordingState: "nice try",
        msg: msg
      })
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
                      handleFail={(msg) => this.handleFail(msg)}
                      haveClip={this.props.haveClip}
                      id={this.props.id}
                      url={this.props.url}
                      />;
            break;
        case "nice try":
            rtnVar = (
              <div>
                <button onClick={() => this.setRecordingState("ready")}>CLICK TO ReTRY</button>
                <h4>{this.state.msg}</h4>
              </div>
            );
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