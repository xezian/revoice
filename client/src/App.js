import React, { Component } from 'react';
import { Record, Recording, Play, Playing } from './components/Utils/Audio/';
import logo from './components/Utils/buttons/logo.svg'
import Footy from './components/Footy/Footy';
import './App.css';

class App extends Component {
  state = {
    logo:false,
    recordingState:null,
  }
  componentDidMount() {
    this.setState({logo:true,recordingState:"ready"})
  }
  handleRecordingState = () => {
    switch(this.state.recordingState){
      case "ready":
        return <Record
                  handleRecord={this.setRecordingState}
                  />
        break;
      case "recording":
        return <Recording
                  handleRecording={this.setRecordingState}
                  />
        break;
      case "recorded":
        return <Play
                  handlePlay={this.setRecordingState}
                  />
        break;
      case "playing":
        return <Playing
                  handlePlaying={this.setRecordingState} 
                  />
        break;
      default:
        return <h2>Unknown recordingState</h2>
        break;
    }
  }
  setRecordingState = (which) => {
    this.setState({recordingState:which});
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">eciov</h1>
          {this.state.logo ? 
          <img src={logo} className="App-logo" alt="logo" /> :
          null}
        </header>
        <p className="App-intro">
          eciov* is a simple + fun game to enjoy with your friends
        </p>
        <p>
          this is a normal p, the above p has className App-intro and looks <span className="App-intro">like this</span>
          <br/>
          can you see the difference? They are both here to help decide
          <br/>
          <span className="directions">
          some simple direction / a call to action will go in here
          <br/>
          (to get started, click record and say something)
          </span>
        </p>
        <h1 className="record-label">record / stop / play </h1>
          {this.handleRecordingState()}
          <Footy />
      </div>
    );
  }
}

export default App;
