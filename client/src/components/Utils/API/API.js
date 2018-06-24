import axios from 'axios';

export default {
    storeClip: form => axios.post('/api/upload', form, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }),
    succeed: (form, id) => axios.post(`/api/upload/${id}`, form, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }),
    getOne: id => axios.get(`/api/clips/${id}`),
    getSome: (options) => axios.get('/api/clips', {options}),
    getThree: id => axios.get(`/api/attempts/${id}`),
    delete: (id) => {
        axios.delete(`/api/clips/${id}`)
    }
}