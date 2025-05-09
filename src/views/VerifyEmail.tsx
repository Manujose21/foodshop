import { Link, useNavigate } from "react-router";
import { client } from "../axios/client";
import toast, {Toaster} from "react-hot-toast";
import useSWR from "swr";
import { useEffect } from "react";

export const VerifyEmail = () => {

    const navigate = useNavigate();

    const { data: user } = useSWR('/user', () =>
        client.get('/user', {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        })
            .then(res => res.data)
            .catch((e) => {
                throw new Error(e.response?.data?.message || 'Failed to fetch user data');
            }),
    );


    useEffect(() => {
        if (user && user.email_verified_at) {
             navigate('/shop');
        }
    }, [user]);

    const handleResendEmail = async () => {
        try {
            const response = await client.post('/email/resend', {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}`}
            });
            console.log(response.data);
            toast.success('Correo de verificación reenviado. Por favor, revisa tu bandeja de entrada.');
        } catch (error) {
            console.error(error);
            toast.error('Error al reenviar el correo de verificación. Por favor, intenta nuevamente más tarde.');
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen max-w-2xl ">
            <Toaster></Toaster>
            <h1 className="text-2xl font-bold mb-4">Verifica tu correo electrónico</h1>
            <p className="text-gray-300 mb-4">Hemos enviado un enlace de verificación a tu correo electrónico. Por favor, revisa tu bandeja de entrada y haz clic en el enlace para verificar tu cuenta.</p>
            <p className="text-gray-300">Si no recibiste el correo, puedes volver a enviarlo haciendo clic en el botón de abajo.</p>
            <button onClick={handleResendEmail} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Reenviar correo de verificación</button>
            <Link to={'/auth/login'}></Link>
        </div>
    )
}
