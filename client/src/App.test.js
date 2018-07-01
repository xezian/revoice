import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AudioContext from './components/Utils/Audio/Context/AudioContext';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('gets Audio Context', () => {
  AudioContext.getAudioContext();
});