import { Outlet } from "react-router"
import { Sidebar } from "../components/Sidebar"
import { BuyCart } from "../components/BuyCart"
import { useContext, useEffect } from "react"
import ShopContext from "../context/useContextShop"
import { Menu } from "../components/Menu"
// import { useAuth } from "../hooks/useAuth"


export const AuthenticatedLayout = () => {

    const { getCategories, categories, category, filter } = useContext(ShopContext)

   
    useEffect(() => {
        getCategories();
    }, [])

    return (
        <>
            <div className="flex flex-row min-h-screen">
                <Sidebar  categories={categories} categorySelected={category} filter={filter} />
                <main className="flex-1">
                    <Menu />
                    <Outlet></Outlet>
                </main>
                <BuyCart />
            </div>
        </>
    )

}