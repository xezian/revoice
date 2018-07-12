import React, { Component }  from 'react';
import record from '../../buttons/record.svg'


export default class Record extends Component {
    componentDidMount() {
        this.props.directions(['click and allow microphone access', 'and you will begin a 3 second recording']);
    }
    render() {
        return (
            <div>
                <img onClick={() => this.props.handleRecord("recording")} src={record} alt='record' />
                <br/>
                CLICK TO RECORD (3 secs)    
            </div>
        );
    };
};