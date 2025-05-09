
import { useState } from "react"
import { useNavigate } from "react-router"
import { client } from "../axios/client";
import { AxiosError } from "axios";
import useSWR from "swr";


interface Data {
    email?: string,
    password?: string,
    name?: string,
    address?: string,
    phone?: string,
    password_confirmation?: string,
}


export const useAuth = () => {
    const navigate = useNavigate();

    const { data: user, error, mutate } = useSWR('/user', () =>
        client.get('/user', {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        })
            .then(res => res.data)
            .catch((e) => {
                throw new Error(e.response?.data?.message || 'Failed to fetch user data');
            }),
            {
                revalidateOnFocus: false,
                revalidateOnReconnect: false,
                shouldRetryOnError: false,
                refreshInterval: 0,
                dedupingInterval: 0,
            }
        );

    const [errors, setErrors] = useState<string[]>([]);

    const login = async (data: Data) => {
        console.log('login', data);
        try {
            const userData = await client.post('/login', {
                email: data.email,
                password: data.password
            });

            if (userData.status < 200 || userData.status >= 300 || !userData.data.token) {
                setErrors(userData.data.errors || ['Invalid login attempt']);
                return;
            }

            localStorage.setItem('auth_token', userData.data.token);
            if(userData.data.user.role === 'admin') {
                navigate('/admin');
                return;
            }
            

            if( userData.data.user.email_verified_at === null) {
                navigate('/auth/verify-email');
                return;

            }

            navigate('/shop');
        
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError) {
                setErrors(error.response?.data?.errors ?? ['An error occurred']);
            }
            throw error;
        }
    };

    const register = async (data: Data) => {
        try {
            const userResponse = await client.post('/register', {
                email: data.email,
                address: data.address,
                phone: data.phone,
                name: data.name,
                password: data.password,
                password_confirmation: data.password_confirmation,
            });

            if (userResponse.status < 200 || userResponse.status >= 300 || !userResponse.data.token) {
                setErrors(userResponse.data.errors || ['Registration failed']);
                return;
            }

            localStorage.setItem('auth_token', userResponse.data.token);
            
            navigate('/auth/verify-email');

        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError) {
                setErrors(error.response?.data?.errors ?? ['An error occurred']);
            }
        }
    };

    const logout = () => {

        client.get('/logout', {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        }).then(() => {
            
            localStorage.removeItem('auth_token');
            setErrors([]);
            mutate(null, false); // Revalidate the user data
            navigate('/auth/login');
        });

    };


    return {
        login,
        register,
        logout,
        errors,
        user,
        error
    };
};
