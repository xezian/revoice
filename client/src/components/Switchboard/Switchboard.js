import React, { Component } from 'react';
import { Recorderator } from '../Utils/Audio/';
import { Clip } from '../Utils/Audio/';
import Browse from '../Browse/Browse';
import './Switchboard.css';

export default class Switchboard extends Component {
    state = {
        id: null,
        url: null,
        options: null,
        choseClip: false,
    }
    chooseOne = (id) => {
        this.setState({
            id: id,
            options: 'choiceClip',
            choseClip: false
        })
    }
    useOne = (id, url) => {
        this.setState({
            id: id,
            url: url,
            options: 'attempt',
            choseClip: true
        })
    }
    switchView = (view) => {
        this.setState({
            options: view,
            choseClip: false,
        })
    }
    play = (clipUrl) => {
        const audio = new Audio(clipUrl);
        audio.type = 'audio/wav';
        audio.play();
    }
    userState = () => {
        let rtnVar;
        switch(this.state.options){
        case 'recordAnew':
            rtnVar = <Recorderator
                        emojiState={emoji=>this.props.emojiState(emoji)}
                        handleSave={this.chooseOne}
                        audioBitsPerSecond={this.props.audioBitsPerSecond}
                    />;
            break;
        case 'attempt':
            rtnVar = <Recorderator
                        emojiState={emoji=>this.props.emojiState(emoji)}
                        handleSave={this.chooseOne}
                        audioBitsPerSecond={this.props.audioBitsPerSecond} 
                        haveClip={true}
                        id={this.state.id}
                        url={this.state.url}
                    />;
            break;
        case 'choiceClip':
            rtnVar = <Clip
                        emojiState={emoji=>this.props.emojiState(emoji)}
                        clipId={this.state.id}
                        switchView={this.switchView}
                        useOne={this.useOne}
                        />
            break;
        case 'browseClips':
            rtnVar = <Browse
                        emojiState={emoji=>this.props.emojiState(emoji)}
                        chooseOne={this.chooseOne}
                        />
            break;
        default:
            rtnVar = <div>subtle puddle bubble babble</div>;
        }
        return rtnVar;
    }
    render(){
    return (
            <div>
                <div className="butter">
                    <button className="fork" onClick={() => this.switchView('recordAnew')}>RECORD ANEW</button> 
                        { 
                            this.state.choseClip ?
                            <button className="plate food" onClick={() => this.play(this.state.url)}>PLAY SELECTED</button> :
                            <p className="plate"> nothing selected </p> 
                        } 
                    <button className="knife" onClick={() => this.switchView('browseClips')}>BROWSE</button>
                </div>
                <br/>
                <div> {this.userState()} </div>
            </div>
        );
    };
}