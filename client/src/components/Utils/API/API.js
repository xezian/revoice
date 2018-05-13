import axios from 'axios';

export default {
    primaryClip: (clipUrl) => {
        axios.post('/api/clips', {clipUrl});
    },
    attempt: (id, clipUrl) => {
        axios.post(`/api/clips/${id}`, {clipUrl});
    },
    getOne: (id) => {
        axios.get(`/api/clips/${id}`);
    },
    getAll: () => {
        axios.get('/api/clips');
    },
    delete: () => {
        axios.delete(`/api/clips/${id}`)
    }
}