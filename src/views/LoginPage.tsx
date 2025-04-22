import { Link } from 'react-router'
import { Button } from '../components/Button'
import { useShowingButton } from '../hooks/useShowingButton'
import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'


export const LoginPage = () => {

    const { showing, handleShowPassword} = useShowingButton()
    const { login, errors } = useAuth({ middleware: 'guest', to: 'shop' });

    useEffect(() => {
        document.title = "Inicia sesión - FoodShop"
    }, [])


    const handleSubmit = async ( e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const data = {
            email : formData.get("email") as string || undefined,
            password : formData.get("password") as string || undefined
        }

        login(data)

    }

    return (
        <>
            <div className="flex flex-col justify-center items-center gap-8 min-w-sm border bg-[#292929] border-gray-400 rounded-md min-h-[60vh] ">
                <h1>Login</h1>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    {errors && <div className='text-red-500 text-sm'>{ Object.values(errors).map((error, i) => (
                        <p key={error+i}>{error}<br /></p>
                    )) }</div>}
                    <label className='relative w-full'>
                        <input type="text" name='email' placeholder='Email' className='w-full bg-[#242424] border border-gray-400 rounded-md p-2' />
                    </label>
                    <label className="relative w-full">
                            
                        <button type='button' onClick={handleShowPassword} className="absolute top-1 right-2 cursor-pointer p-2 text-xs">
                            show
                        </button> 

                        <input type={ showing ? "text" : "password" }  name='password' className="bg-[#242424] w-full rounded outline-none border border-gray-400 p-2 pr-10" placeholder="Password"/>
                        
                    </label>
                    <label className='text-sm'>
                        No tienes cuenta aún? 
                        <Link to={'/auth/register'} className='text-indigo-500 ml-2'>Registrate aquí</Link>
                    </label>
                    <Button type='submit' className='bg-blue-500 text-white rounded-md p-2'>Iniciar</Button>
                </form>
            </div>
        </>
    )

}