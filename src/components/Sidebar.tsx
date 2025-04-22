import { useAuth } from "../hooks/useAuth";
import { Category } from "../types/interfaces"
interface Props {
    categories: Category[],
    categorySelected: number, 
    filter:  (category: number) => void,
    
}
export const Sidebar = ( { categories, categorySelected, filter }: Props ) => {
    
    const { user, error } = useAuth({ middleware: 'auth' });
    
    return (
        <>
            <aside className="bg-[#222222]  text-white  min-h-screen relative">
                
                <ul className="list-none sticky top-0">
                    <h1 className="text-xl font-semibold p-6 ">Categorias</h1>
                    <span className="text-gray-400 text-sm p-6">Bienvenido { user && user.name }</span>
                    {/* <p className=""> { user.name } </p> */}
                    {categories.map((category) => (
                        <li key={category.id} 
                            className={`mb-2 py-4 hover:bg-[#202020] flex items-center rounded-md 
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
                </ul>
            </aside>
        </>
    )
} 