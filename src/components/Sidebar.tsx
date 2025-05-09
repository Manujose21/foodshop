import { Link, useLoaderData } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Category } from "../types/interfaces"
import { PowerIcon } from "./icons/PowerIcon";
interface Props {
    categories: Category[],
    categorySelected: number, 
    filter:  (category: number) => void,
    isAdmin?: boolean
}
export const Sidebar = ( { categories, categorySelected, filter, isAdmin = false }: Props ) => {
    
    const user = useLoaderData();    
    console.log(user);

    const { logout } = useAuth();

    return (
        <>
            <aside className="bg-[#222222]  text-white  min-h-screen relative">
                
                <ul className="list-none sticky top-0">
                    <h1 className="text-xl font-semibold p-6 ">Categorias</h1>
                    <span className="text-gray-400 text-sm p-6">Bienvenido { user && user.name }</span>
                    
                    { isAdmin ?
                        
                        <div className="flex flex-col gap-2 p-6">
                            <li className="cursor-pointer">
                                <Link to={'/admin/orders'} className="flex gap-2 hover:bg-[#191919] rounded-md p-2">
                                    Ordenes
                                </Link>
                            </li>
                            <li className="cursor-pointer ">
                                <Link to={'/admin/users'} className="flex gap-2 hover:bg-[#191919] rounded-md p-2">
                                    Usuarios
                                </Link>
                            </li>
                            <li className="cursor-pointer ">
                                <Link to={'/admin/products'} className="flex gap-2 hover:bg-[#191919] rounded-md p-2">
                                    Productos
                                </Link>
                            </li>
                            <li className="cursor-pointer ">
                                <Link to={'/admin/categories'} className="flex gap-2 hover:bg-[#191919] rounded-md p-2">
                                    Categorias
                                </Link>
                            </li>
                        </div>
                        : <div>
                            {categories.map((category) => (
                                <li key={category.id} 
                                    className={`mb-2 py-2 hover:bg-[#202020] flex items-center rounded-md 
                                        ${categorySelected === category.id ? 'bg-[#fcf524] hover:bg-[#fcf524cd]' : ''}`} 
                                    onClick={() => filter(category.id)}>
                                    <img src={`../../public/img/icono_${category.icon}.svg`} alt={`img_${category.icon}`} className="w-8 h-8 pl-2"/>
                                    <a className={`cursor-pointer px-6 ${categorySelected === category.id ? 'text-black' : ''}`} href="#">
                                        {category.name}
                                    </a>
                                </li>
                            ))}
                            <li key={'all'} 
                                className={`mb-2 py-4 hover:bg-[#202020] flex items-center rounded-md 
                                    ${categorySelected === 0 ? 'bg-[#fcf524] hover:bg-[#fcf524cd]' : ''}`} 
                                onClick={() => filter(0)}>
                                <a className={`cursor-pointer px-6 ${categorySelected === 0 ? 'text-black' : ''}`} href="#">
                                    Todos 
                                </a>
                            </li>
                        </div>
                    }
                    { user.role === "admin" && <span className="p-6 flex gap-2 text-sm cursor-pointer hover:bg-[#191919]" >
                        <Link to={'/admin'}> Admin dashboard </Link>
                    </span>}
                    <span className="p-6 flex gap-2 text-sm cursor-pointer hover:bg-[#191919]" onClick={() => logout()}>
                        <PowerIcon/>
                        Cerrar sesión
                    </span>
                </ul>
            </aside>
        </>
    )
} 