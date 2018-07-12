import React, { Component } from 'react';
import API from '../../API/API';
import './Clip.css';

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
        this.props.toMarquee('Behold, the clip you selcted');
        this.props.directions([
            'the button called ORIGINAL plays the backwards clip',
            'the button called ATTEMPT lets you try and mimic the exact backwards sound which will in turn be flipped around forward',
            'the numbers on the top three attempts are your score using a DTW algorithm to compare your attempt against the original',
            'if you click the numbered buttons you will hear the attempts people have made, which have been "reversed forward"',
            "the box is displaying some info about the audio clip",
            "click browse to go back"
        ])
    }
    getClip = () => {
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
            attemptObj.push(obj.data);
        }).catch(err => console.log(err));
        this.setState({attemptObj})
        setTimeout(()=>{
            this.setState({haveAttempts: true});
        },200);
    }
    attempt = () => {
        const id = this.state.clipObj[0]._id;
        const url = this.state.clipObj[0].originalClip;
        this.setState({haveClip:false})
        this.props.useOne(id,url);
    }
    play = (clipUrl) => {
        const audio = new Audio(clipUrl);
        audio.type = 'audio/wav';
        audio.play();
    }
    render(){
        return (
            <div className="clipview">
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
                    <div className="codeblock"><code>[{JSON.stringify(this.state.clipObj[0])}]</code></div> :
                    <code>[{this.state.heart}]</code>
                }
            </div>
        ) 
    }
}