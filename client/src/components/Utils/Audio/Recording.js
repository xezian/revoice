import React, { Component }  from 'react';
import recblink from '../buttons/rec-blink.svg';


export default class Recording extends Component {
    render() {
        return (
            <img onClick={() => this.props.handleRecording("recorded")} src={recblink} alt='recording' />
        );
    };
};