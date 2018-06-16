import React, { Component } from 'react';
import API from '../../API/API';

export default class Clip extends Component {
    state = {
        id: this.props.clipId,
        clipObj: null,
        haveClip: false,
        heart: '<3',
    }
    componentDidMount () {
        this.getClip();
        this.props.emojiState('🌀');
    }
    getClip = () => {
        console.log(this.state);
        let clipObj = [];
        API.getOne(this.state.id).then(obj => {
            clipObj.push(obj.data);
        }).catch(err => {console.log(err)});
        this.setState({clipObj})
        setTimeout(()=>{
            this.setState({haveClip: true});
        },200);
    }
    backToBrowse = () => {
        this.props.backToBrowse('browseClips');
    }
    play = () => {
        console.log(this.state.clipObj)
        const audio = new Audio(this.state.clipObj[0].originalClip);
        audio.type = 'audio/wav';
        audio.play();
    }
    render(){
        return (
            <div>
                <button onClick={this.play}>PLAY</button>
                <br/>
                {this.state.haveClip ? 
                    <div><code>[{JSON.stringify(this.state.clipObj[0])}]</code></div> :
                    <code>[{this.state.heart}]</code>
                }
                <br/>
                <button onClick={this.backToBrowse}>buttin clicken</button>
            </div>
        ) 
    }
}