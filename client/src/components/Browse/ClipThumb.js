import React, { Component } from 'react';
import './Browse.css';

export default class ClipThumb extends Component {
    play = () => {
        const audio = new Audio(this.props.sourceUrl);
        audio.type = 'audio/wav';
        audio.play();
    }
    select = (id) => {
        this.props.handleSelect(id);
    }
    render() {
        return (
            <div className="clipThumb">
                <br/>
                <button onClick={this.play}>PLAY</button>
                <br/>
                <button onClick={(id) => this.select(this.props.sourceId)}>SELECT</button>
            </div>
        )
    }
}