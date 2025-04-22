
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { client } from "../axios/client";
import { AxiosError } from "axios";
import useSWR from "swr";
interface From {
    middleware?: "guest" | "auth",
    to?: string,
}

interface Data {
    email?: string,
    password?: string,
    name?: string,
    address?: string,
    phone?: string,
    password_confirmation?: string,
}


export const useAuth = ({ middleware = "guest", to }: From) => {
    const navigate = useNavigate();

    const { data: user, error, mutate } = useSWR('/user', () =>
        client.get('/user', {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        })
            .then(res => res.data)
            .catch((e) => {
                throw new Error(e.response?.data?.message || 'Failed to fetch user data');
            })
    );

    const [errors, setErrors] = useState<string[]>([]);

    const login = async (data: Data) => {
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
            await mutate();

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
            await mutate();

        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError) {
                setErrors(error.response?.data?.errors ?? ['An error occurred']);
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        navigate('/login');
    };

    useEffect(() => {
        
        if (middleware === 'guest' && user) {
            navigate(`/${to ?? 'shop'}`);
            return;
        }

        if (middleware === 'auth' && error) {
            navigate('/auth/login');
            return;
        }

    }, [user, error]);

    return {
        login,
        register,
        logout,
        errors,
        user,
        error
    };
};
