import React, { Component }  from 'react';
import AudioContext from '../Context/AudioContext';
import playblink from '../../buttons/play-blink.svg';
import play from '../../buttons/play.svg';
import recblink from '../../buttons/rec-blink.svg';
import toWav from 'audiobuffer-to-wav';
import API from '../../API/API';


const audioCtx = AudioContext.getAudioContext();

export default class Playing extends Component {
    componentDidMount() {
        audioCtx.resume();
        let source = audioCtx.createBufferSource();
        source.buffer = this.props.revBuff;
        source.connect(audioCtx.destination);
        source.start();
    }
    playBuff = (sorce) => {
        let source = audioCtx.createBufferSource();
        source.buffer = sorce;
        source.connect(audioCtx.destination);
        source.start();
    }
    saveForLater = () => {
        const wav = toWav(this.props.revBuff);
        const blob = new window.Blob([ new DataView(wav) ], {
          type: 'audio/wav'
        });
        const form = new FormData();
        form.append('originalclip', blob);
        API.storeClip(form)
            .then(res => {
                this.props.handleSave(res.data._id);
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <div>
                <div>
                    <img onClick={() => this.playBuff(this.props.revBuff)} src={play} alt='playing' />
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