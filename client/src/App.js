import React, { Component } from 'react';
import { Recorderator } from './components/Utils/Audio/';
import logo from './components/Utils/buttons/logo.svg'
import Footy from './components/Footy/Footy';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>revoice</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <p>
          revoice is a simple + fun game to enjoy with your friends
        </p>
        <p>
          <span className="directions">
          to get started, click record and say something
          </span>
        </p>
        <h1 className="record-label">record / stop / play </h1>
          <Recorderator
            audioBitsPerSecond= {128000}/>
          <Footy />
      </div>
    );
  }
}

export default App;
