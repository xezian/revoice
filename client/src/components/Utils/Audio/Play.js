import React, { Component }  from 'react';
import play from '../buttons/play.svg';

export default class Play extends Component {
    handlePlayClick = () => {
        this.props.handlePlay("playing");
    }
    render() {
        if(this.props.revBuff){
            console.log('here lies a reversed buffer');
            console.log(`revBuff: ${this.props.revBuff}`);
            return (
                <div>
                    <img onClick={this.handlePlayClick} src={play} alt='play' />
                    <br/>
                    PLAY ^ BUTTON
                </div>
            );
        } else {
            return <div>reversing</div>;
        }
    };
};