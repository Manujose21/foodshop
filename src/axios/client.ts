import axios from 'axios';

export const client  = axios.create({  
    baseURL: 'http://localhost/api',
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});