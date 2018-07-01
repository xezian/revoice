import React, { Component }  from 'react';
import AudioContext from '../Context/AudioContext';
import playblink from '../../buttons/play-blink.svg';
import play from '../../buttons/play.svg';
import recblink from '../../buttons/rec-blink.svg';
import toWav from 'audiobuffer-to-wav';
import CompareTheseBuffers from '../Attempt/CompareTheseBuffers';
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
    saveForLater = (sorce) => {
        const wav = toWav(sorce);
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
    attempt = (sorce) => { 
        CompareTheseBuffers(sorce, this.props.url, this.props.id).then(res => {
            console.log(res);
            if(res.success){
                const wav = toWav(sorce);
                const blob = new window.Blob([ new DataView(wav) ], {
                  type: 'audio/wav'
                });
                const form = new FormData();
                form.append('attempt', blob);
                form.append('score', res.score)
                API.succeed(form, this.props.id)
                    .then((res) => {
                        this.props.handleSave(this.props.id);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                this.props.handleFail(res); 
            }
        }).catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <div>
                    <div>
                        <img onClick={() => this.playBuff(this.props.revBuff)} src={play} alt='playing' />
                        <br/>
                        PLAY AGAIN
                    </div>
                        { this.props.haveClip ? 
                            <div>
                                <img onClick={() => this.attempt(this.props.revBuff)} src={recblink} alt='playing' />
                                <br/>
                                COMPARE CLIPS (ATTEMPT)
                            </div> :
                            <div>
                                <img onClick={() => this.saveForLater(this.props.revBuff)} src={recblink} alt='playing' />
                                <br/>
                                SAVE CLIP FOREVER
                            </div>
                        }
                    <div>
                        <img onClick={() => this.props.handlePlaying("ready")} src={playblink} alt='playing' />
                        <br/>
                        START AGAIN
                    </div>
                </div>
            </div>
        );
    };
};