import React, { Component } from 'react';
import Play from './Play';
import Playing from './Playing';
import Record from './Record';
import Recording from './Recording';

class Recorderator extends Component {
    state = {
        recordingState: null,
    }
    componentDidMount() {
        this.setState({recordingState:"ready"})
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
                    handleRecording={this.setRecordingState}
                    />;
            break;
        case "recorded":
            rtnVar = <Play
                    handlePlay={this.setRecordingState}
                    />;
            break;
        case "playing":
            rtnVar = <Playing
                    handlePlaying={this.setRecordingState} 
                    />;
            break;
        default:
            rtnVar = <h2>Unknown recordingState</h2>;
        }
        return rtnVar;
    }
    setRecordingState = (which) => {
        this.setState({recordingState:which});
    }
    render(){
        return <div> {this.handleRecordingState()} </div>;
    }
};

export default Recorderator;