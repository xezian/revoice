import React, { Component }  from 'react';
import AudioContext from './AudioContext';
import playblink from '../buttons/play-blink.svg';
import play from '../buttons/play.svg';

const audioCtx = AudioContext.getAudioContext();

export default class Playing extends Component {
    componentDidMount() {
        audioCtx.resume();
        let source = audioCtx.createBufferSource();
        source.buffer = this.props.revBuff;
        source.connect(audioCtx.destination);
        source.start();
    }
    playAgain = () => {
        let source = audioCtx.createBufferSource();
        source.buffer = this.props.revBuff;
        source.connect(audioCtx.destination);
        source.start();
    }
    render() {
        return (
            <div>
                <div>
                    <img onClick={this.playAgain} src={play} alt='playing' />
                    <br/>
                    PLAY AGAIN
                </div>
                <div>
                    <img onClick={() => this.props.handlePlaying("ready")} src={playblink} alt='playing' />
                    <br/>
                    START AGAIN
                </div>
            </div>
        );
    };
};