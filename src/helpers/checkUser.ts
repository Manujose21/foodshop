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
        console.log(res.data)
        if (res.data.id) {
            return res.data;
        }
    }).catch((e) => {
        console.error(e);
        return false;
    });

}
