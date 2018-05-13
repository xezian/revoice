import React, { Component }  from 'react';
import recblink from '../buttons/rec-blink.svg';

export default class Recording extends Component {
    componentDidMount(){
        // start the recording
        setTimeout(() => this.props.handleRecording("recorded"), 3000);
    }
    render() {
        return (
            <img src={recblink} alt='recording' />
        );
    };
};