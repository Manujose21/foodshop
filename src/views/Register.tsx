import { useEffect } from "react"
import { Button } from "../components/Button"
import { useShowingButton } from "../hooks/useShowingButton"

import { useAuth } from "../hooks/useAuth"
export const RegisterPage = () => {

    const { showing, handleShowPassword } = useShowingButton()
    const {  showing : showingConfirm ,  handleShowPassword: handleShowPasswordConfirm } = useShowingButton()

    const { register, errors } = useAuth({ middleware: 'guest', to: 'shop' });

    useEffect(() => {
        document.title = "Register - FoodShop"
    }, [])

    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        console.log(formData.get("email"))

        const data = {
            email : formData.get("email") as string || undefined,
            address : formData.get("address") as string || undefined,
            phone : formData.get("phone") as string || undefined,
            name : formData.get("name") as string || undefined,
            password: formData.get("password") as string || undefined,
            password_confirmation: formData.get("password_confirmation") as string || undefined,
        }

        register(data)
    }


    return (
        <>
            <div className="flex flex-col justify-center items-center gap-8 min-w-sm border bg-[#292929] border-gray-400 rounded-md min-h-[60vh] py-8 ">
                <h1>Register</h1>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    { errors && 
                        <div className='text-red-500 text-sm'>
                            { Object.values(errors).map((error, i) => (
                                <p key={error+i}>{error}<br /></p>
                        ))}
                        </div>
                    }
                    <label className='relative w-full'>
                        Email
                        <input type="text" placeholder='Email' name="email" className='w-full bg-[#242424] border border-gray-400 rounded-md p-2' />
                    </label>
                    {/* name */}
                    <label htmlFor="">
                        Nombre
                        <input type="text" placeholder='Nombre y Apellido' name="name" className='w-full bg-[#242424] border border-gray-400 rounded-md p-2' />
                    </label>
                    {/* address */}
                    <label htmlFor="">
                        Dirección
                        <input type="text" placeholder='Direccion' name="address" className='w-full bg-[#242424] border border-gray-400 rounded-md p-2' />
                    </label>
                    {/* phone */}
                    <label htmlFor="">
                        Telefono
                        <input type="text" placeholder='Telefono' name="phone" className='w-full bg-[#242424] border border-gray-400 rounded-md p-2' />
                    </label>
                    {/* passwords */}
                    <label className="relative w-full">
                            
                            <button type='button' onClick={handleShowPasswordConfirm} className="absolute top-1 right-2 cursor-pointer p-2 text-xs">
                                show
                            </button> 

                            <input type={ showingConfirm ? "text" : "password" } name="password" className="w-full rounded outline-none border bg-[#242424] border-gray-400 p-2 pr-10" placeholder="Crear contraseña"/>
                            
                    </label>
                    <label className="relative w-full">
                            
                            <button type='button' onClick={handleShowPassword} className="absolute top-1 right-2 cursor-pointer p-2 text-xs">
                                show
                            </button> 

                            <input type={ showing ? "text" : "password" } name="password_confirmation" className="w-full bg-[#242424] rounded outline-none border border-gray-400 p-2 pr-10" placeholder="Confirmar contraseña"/>
                            
                    </label>
                    {/* end passwords */}
                    <Button type="submit" className='bg-blue-500 text-white rounded-md p-2'>Registrarme</Button>
                </form>
            </div>
        </>
    )

}