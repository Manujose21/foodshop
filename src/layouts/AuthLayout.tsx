import logo from '../../public/img/logo.svg'
import { Outlet } from "react-router"
export const  AuthLayout = () => {
    return(
        <>
            <div className="flex justify-center items-center gap-8 h-screen">
                <div >
                    <img src={logo} alt="" className='w-80' />
                </div>
                <Outlet />
            </div>
        </>
    )
}
