import { AxiosResponse } from "axios";
import { User } from "../types/interfaces";
import { client } from "../axios/client";


export const checkUser = () => {

    console.log('checkUser')
    const token = localStorage.getItem('auth_token');
    if (!token) {
        return false;
    }
    console.log(token)
    return client.get('/user', {
        headers: { Authorization: `Bearer ${token}` }
    }).then((res: AxiosResponse<User>) => {
     
        if (res.data.id && res.data.email_verified_at) {
            return res.data;
        }
    }).catch((e) => {
        console.error(e);
        return false;
    });

}
