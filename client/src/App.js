import React, { Component } from "react";
import logo from "./components/Utils/buttons/logo.svg";
import Switchboard from "./components/Switchboard/Switchboard";
import Footy from "./components/Footy/Footy";
import "./App.css";

class App extends Component {
  state = {
    emojiState: "❤",
    message:
      "revoice is a simple + fun game to enjoy with (or without) your friends",
    directions: ["to get started, click record anew or browse"],
    colors: [
      "green",
      "orange",
      "purple",
      "goldenrod",
      "silver",
      "black",
      "maroon",
      "blue",
      "red",
      "#e429bd"
    ]
  };
  switchEmoji = emoji => {
    this.setState({ emojiState: emoji });
  };
  toMarquee = message => {
    this.setState({ message });
  };
  directions = directions => {
    this.setState({ directions });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>revoice</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <p>{this.state.message}</p>
        <ul className="directions">
          {this.state.directions.map((direction, key) => {
            return (
              <span key={key} style={{ color: this.state.colors[key] }}>
                {direction}
                <br />
              </span>
            );
          })}
        </ul>
        <h1 className="record-label">{this.state.emojiState}</h1>
        <Switchboard
          emojiState={emoji => this.switchEmoji(emoji)}
          toMarquee={message => this.toMarquee(message)}
          directions={directions => this.directions(directions)}
        />
        <Footy />
      </div>
    );
  }
}

export default App;
