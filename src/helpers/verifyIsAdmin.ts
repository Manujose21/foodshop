import { client } from "../axios/client";


export const verifyIsAdmin = () => {

    const token = localStorage.getItem('auth_token');
    if (!token) {
        return false;
    }

    return client.get('/user', {
        headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
        if (res.data.role === 'admin') {
            return res.data;
        }
        return false;
    }).catch((e) => {
        console.error(e);
        return false;
    });

}
