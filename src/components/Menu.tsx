
import { Link } from "react-router"

export const Menu = () => {


    return (
        <>
            <nav className="flex gap-5 bg-[#222222] text-white p-4">
                <Link to={'/shop'}>Productos</Link>
                <Link to={'/shop/orders'}>Ordenes</Link>
            </nav>
        </>
    )

}