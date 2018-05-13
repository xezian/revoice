import axios from 'axios';

export default {
    primaryClip: (audioChunks) => {
        axios.post('/api/clips', {audioChunks});
    },
    getPrimary: (id) => {
        axios.get('/api/clips', {id});
    },
}