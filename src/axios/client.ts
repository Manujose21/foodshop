import axios from 'axios';

export const client  = axios.create({  
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});