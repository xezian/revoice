import axios from 'axios';

export default {
    storeClip: form => axios.post('/api/upload', form, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }),
    attempt: (id, clipUrl) => {
        axios.post(`/api/clips/${id}`, {clipUrl});
    },
    getOne: (id) => {
        axios.get(`/api/clips/${id}`);
    },
    getAll: () => {
        axios.get('/api/clips');
    },
    delete: (id) => {
        axios.delete(`/api/clips/${id}`)
    }
}