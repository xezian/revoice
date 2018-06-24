import React, { Component } from 'react';
import API from '../../API/API';

export default class Clip extends Component {
    state = {
        id: this.props.clipId,
        clipObj: null,
        attemptObj: null,
        haveClip: false,
        haveAttempts: false,
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
            this.getAttempts();
        },200);
    }
    backToBrowse = () => {
        this.props.switchView('browseClips');
    }
    getAttempts = () => {
        let attemptObj = [];
        API.getThree(this.state.id).then(obj => {
            console.log(obj.data)
            attemptObj.push(obj.data);
        }).catch(err => console.log(err));
        this.setState({attemptObj})
        setTimeout(()=>{
            this.setState({haveAttempts: true});
            console.log(this.state.attemptObj);
        },200);
    }
    attempt = () => {
        const id = this.state.clipObj[0]._id;
        const url = this.state.clipObj[0].originalClip;
        this.setState({haveClip:false})
        this.props.useOne(id,url);
    }
    play = (clipUrl) => {
        console.log(clipUrl)
        const audio = new Audio(clipUrl);
        audio.type = 'audio/wav';
        audio.play();
    }
    render(){
        return (
            <div>
                <button onClick={() => this.play(this.state.clipObj[0].originalClip)}>ORIGINAL</button>
                { this.state.haveClip ?
                    <div>
                        { this.state.haveAttempts ? 
                            this.state.attemptObj[0].map((each, i) => {
                                return <button key={i} onClick={() => this.play(each.attempt)}>[{each.score}]</button>
                            }):
                            <code>[{this.state.heart}]</code>
                        }
                    </div> :
                    <code>[{this.state.heart}]</code>
                }
                <button onClick={this.attempt}>ATTEMPT</button>
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