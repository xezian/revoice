import React, { Component }  from 'react';
import play from '../buttons/play.svg';


export default class Play extends Component {
    constructor(props){
        super(props);
    }
    handlePlayClick = () => {
        const audio = new Audio(this.props.blobURL);
        audio.play();
        this.props.handlePlay("playing")
    }
    render() {
        if(this.props.blobURL){
            console.log('here lies a blob\'s URL');
            console.log(`blobURL: ${this.props.blobURL}`)
        }
        return (
            <img onClick={this.handlePlayClick} src={play} alt='play' />
        );
    };
};