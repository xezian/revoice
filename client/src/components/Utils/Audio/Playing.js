import React, { Component }  from 'react';
import AudioContext from './AudioContext';
import playblink from '../buttons/play-blink.svg';
import play from '../buttons/play.svg';
import recblink from '../buttons/rec-blink.svg';
import toWav from 'audiobuffer-to-wav';
import API from '../API/API';


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
    saveForLater = () => {
        const wav = toWav(this.props.revBuff);
        const blob = new window.Blob([ new DataView(wav) ], {
          type: 'audio/wav'
        })
        const url = window.URL.createObjectURL(blob);
        API.storeClip(url);
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
                    <img onClick={this.saveForLater} src={recblink} alt='playing' />
                    <br/>
                    SAVE CLIP FOREVER
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