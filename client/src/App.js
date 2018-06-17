import React, { Component } from 'react';
import logo from './components/Utils/buttons/logo.svg';
import Switchboard from './components/Switchboard/Switchboard';
import Footy from './components/Footy/Footy';
import './App.css';

class App extends Component {
  state = {
    emojiState: '❤'
  }
  switchEmoji = (emoji) => {
    this.setState({emojiState:emoji});
  }
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
          to get started, click record anew or browse
          </span>
        </p>
        <h1 className="record-label">{this.state.emojiState}</h1>
          <Switchboard
            emojiState={(emoji)=>this.switchEmoji(emoji)}
            audioBitsPerSecond= {320000}/>
          <Footy />
      </div>
    );
  }
}

export default App;
