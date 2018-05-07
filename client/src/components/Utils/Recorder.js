import React, { Component }  from 'react';
import record from './record.svg';

export default class Recorder extends Component {
    handleRecord = () => {
        var context = new (window.AudioContext || window.webkitAudioContext)();
        alert(context);
    };
    render() {
        return (
            <img onClick={this.handleRecord} src={record} alt='record' />
        );
    };
};