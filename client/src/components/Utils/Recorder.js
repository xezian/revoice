import React, { Component }  from 'react';
import record from './record.svg';

export default class Recorder extends Component {
    handleRecord = () => {
        navigator.mediaDevices.getUserMedia({audio: true})
        .then(function(stream) {
         console.log(stream);
        })
        .catch(function(err) {
        /* handle the error */
        });
    };
    render() {
        return (
            <img onClick={this.handleRecord} src={record} alt='record' />
        );
    };
};

