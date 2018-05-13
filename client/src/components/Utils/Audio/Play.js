import React, { Component }  from 'react';
import play from '../buttons/play.svg';


export default class Play extends Component {
    render() {
        return (
            <img onClick={() => this.props.handlePlay("playing")} src={play} alt='play' />
        );
    };
};