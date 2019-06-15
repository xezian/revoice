import React, { Component } from "react";
import { Recorderator } from "../Utils/Audio/";
import { Clip } from "../Utils/Audio/";
import Browse from "../Browse/Browse";
import "./Switchboard.css";

export default class Switchboard extends Component {
  state = {
    id: null,
    url: null,
    options: null,
    choseClip: false,
    audioBPS: 128000,
    boxOfThoughts: [
      "subtle puddle bubble babble",
      "one word clips usually work the best",
      "everywhere is somewhere",
      "if you are lucky you will succeed",
      "play my game for your whole life",
      "in a way we are in this together",
      "miracle of not knowing why",
      "tomorrow the next day and the day after",
      "rememeber your favorite epiphany",
      "with the wind in your hair and a headful of dreams",
      "thank you for paying attention"
    ],
    thought: null
  };
  componentDidMount() {
    this.magicBox();
  }
  chooseOne = id => {
    this.setState({
      id: id,
      options: "choiceClip",
      choseClip: false
    });
  };
  useOne = (id, url) => {
    this.setState({
      id: id,
      url: url,
      options: "attempt",
      choseClip: true
    });
  };
  magicBox = () => {
    this.setState({
      thought: this.state.boxOfThoughts[
        Math.floor(Math.random() * this.state.boxOfThoughts.length)
      ]
    });
  };
  switchView = view => {
    this.setState({
      options: view,
      choseClip: false
    });
  };
  play = clipUrl => {
    const audio = new Audio(clipUrl);
    audio.type = "audio/wav";
    audio.play();
  };
  userState = () => {
    let rtnVar;
    switch (this.state.options) {
      case "recordAnew":
        rtnVar = (
          <Recorderator
            toMarquee={message => this.props.toMarquee(message)}
            directions={directions => this.props.directions(directions)}
            emojiState={emoji => this.props.emojiState(emoji)}
            handleSave={this.chooseOne}
            audioBitsPerSecond={this.state.audioBPS}
          />
        );
        break;
      case "attempt":
        rtnVar = (
          <Recorderator
            toMarquee={() =>
              this.props.toMarquee(
                "You have accessed the RECORDERATOR in ATTEMPT mode"
              )
            }
            directions={directions => this.props.directions(directions)}
            emojiState={emoji => this.props.emojiState(emoji)}
            handleSave={this.chooseOne}
            audioBitsPerSecond={this.state.audioBPS}
            haveClip={true}
            id={this.state.id}
            url={this.state.url}
          />
        );
        break;
      case "choiceClip":
        rtnVar = (
          <Clip
            toMarquee={() =>
              this.props.toMarquee(
                "You have accessed the RECORDERATOR in CREATE mode"
              )
            }
            directions={directions => this.props.directions(directions)}
            emojiState={emoji => this.props.emojiState(emoji)}
            clipId={this.state.id}
            switchView={this.switchView}
            useOne={this.useOne}
          />
        );
        break;
      case "browseClips":
        rtnVar = (
          <Browse
            toMarquee={message => this.props.toMarquee(message)}
            directions={directions => this.props.directions(directions)}
            emojiState={emoji => this.props.emojiState(emoji)}
            chooseOne={this.chooseOne}
          />
        );
        break;
      default:
        rtnVar = (
          <div>
            <span role="img" aria-labelledby="waving hello emoji">
              👋
            </span>
            <br />
            <br />
            <br />
          </div>
        );
    }
    return rtnVar;
  };
  render() {
    return (
      <div className="swill">
        <div>{this.state.thought}</div>
        <div className="butter">
          <button
            className="fork"
            onClick={() => this.switchView("recordAnew")}
          >
            RECORD ANEW
          </button>
          {this.state.choseClip ? (
            <button className="food" onClick={() => this.play(this.state.url)}>
              PLAY SELECTED
            </button>
          ) : (
            <p className="plate">
              <span role="img" aria-label="refresh">
                🍽️
              </span>
            </p>
          )}
          <button
            className="knife"
            onClick={() => this.switchView("browseClips")}
          >
            BROWSE
          </button>
        </div>
        <br />
        <div> {this.userState()} </div>
        <button className="refresh" onClick={() => this.magicBox()}>
          <span role="img" aria-label="refresh">
            🔄
          </span>
        </button>
      </div>
    );
  }
}
