import React, { Component } from 'react';
import ClipThumb from './ClipThumb';
import API from '../Utils/API/API';
import './Browse.css';

export default class Browse extends Component {
    state = {
        clipsArr: null,
    }
    componentDidMount() {
        this.loadEmUp();
        this.props.emojiState('📖');
    }
    loadEmUp = (options) => {
        API.getSome(options).then(res => {
            let clipsArrayBuilder = []
            res.data.forEach(one => {
                clipsArrayBuilder.push(one)
            })
            this.setState({
                clipsArr: clipsArrayBuilder,    
            })
        })
    }
    handleSelect = (id) => {
        this.props.chooseOne(id);
    }
    render() {
        return (
            <div>
                <div>BROWSE:</div>
                <div className="browse">
                    { 
                        this.state.clipsArr ? 
                        this.state.clipsArr.map((obj, i) => {
                            return <ClipThumb
                                        key={i}
                                        handleSelect={(id) => this.handleSelect(id)}
                                        sourceUrl={obj.originalClip}
                                        sourceId={obj._id}
                                    />
                        }) :
                        <div>
                            <div>couldn't load resources</div>
                            <button onClick={this.loadEmUp}>retry</button>
                        </div>
                    }
                    <br/>
                </div>
            </div>
        );
    }
}