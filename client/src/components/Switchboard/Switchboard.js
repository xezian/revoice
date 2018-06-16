import React, { Component } from 'react';
import { Recorderator } from '../Utils/Audio/';
import { Clip } from '../Utils/Audio/';
import Browse from '../Browse/Browse';
import './Switchboard.css';

export default class Switchboard extends Component {
    state = {
        id: null,
        options: null,
    }
    chooseOne = (id) => {
        this.setState({
            id: id,
            options: 'choiceClip',
        })
    }
    switchView = (view) => {
        this.setState({
            options: view,
        })
    }
    userState = () => {
        let rtnVar;
        switch(this.state.options){
        case 'record':
            rtnVar = <Recorderator
                        emojiState={emoji=>this.props.emojiState(emoji)}
                        handleSave={this.chooseOne}
                        audioBitsPerSecond={this.props.audioBitsPerSecond} 
                    />;
            break;
        case 'choiceClip':
            rtnVar = <Clip
                        emojiState={emoji=>this.props.emojiState(emoji)}
                        clipId={this.state.id}
                        backToBrowse={this.switchView}
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
                <button className="butter fork" onClick={() => this.switchView('record')}>RECORD ANEW</button>
                <button className="butter knife" onClick={() => this.switchView('browseClips')}>BROWSE</button>
                <div> {this.userState()} </div>
            </div>
        );
    };
}