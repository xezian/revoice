import React, { Component }  from 'react';
import record from '../buttons/record.svg'


export default class Record extends Component {
    render() {
        return (
            <img onClick={() => this.props.handleRecord("recording")} src={record} alt='record' />
        );
    };
};