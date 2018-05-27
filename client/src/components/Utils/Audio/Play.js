import React, { Component }  from 'react';
import play from '../buttons/play.svg';


export default class Play extends Component {
    render() {
        return (
            <div>
                <div>
                    <audio ref="audioSource" controls="controls" src={this.state.blobURL}></audio>
                </div>
                <img onClick={() => this.props.handlePlay("playing")} src={play} alt='play' />
            </div>
        );
    };
};