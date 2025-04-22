import {  useContext, useEffect, useState } from "react"
// import { products } from "../../data/products"
import { CardProduct } from "../../components/CardProduct"
import ShopContext from "../../context/useContextShop"
import { Product } from "../../types/interfaces"
// import { useNavigate } from "react-router"


export const ShopPage = () => {

    const { category, products } = useContext(ShopContext)

    

    useEffect(() => {
        
        window.scrollTo(0, 0)
        document.title = "Shop - FoodShop"

    }, [])

    const [productsFilter, setProducts] = useState<Product[]>([])

    useEffect(() => {
        
        const filteredProducts = products.filter((product) => (category === 0) ? product : product.category_id === category)
        setProducts(filteredProducts)
        

    }, [category])

    return (
        <>
            <div className="px-12 py-8 m-auto max-w-[1440px] w-full ">
                <h1 className="text-3xl font-bold mb-4">Productos</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {category === 0  && products ? ( products.map((product) => (
                        <CardProduct key={product.id} {...product}></CardProduct>
                    )))
                    : (productsFilter.map((product) => (
                        <CardProduct key={product.id} {...product}></CardProduct>
                    )))
                }
                </div>
            </div>
        </>
    )
}