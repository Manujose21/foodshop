import { useContext } from "react"
import ShopContext from "../context/useContextShop"
import { Product } from "../types/interfaces"
import { Button } from "./Button"

export const CardProduct = ( product: Product) => {
    
    const { addToCart } = useContext(ShopContext)

    return (
        <div key={product.id} className="border rounded-lg p-4 flex flex-col items-center justify-center gap-2">
            <img src={`/img/${product.image}.jpg`} alt={product.name} className="w-full h-40 object-cover rounded-lg" />
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-200">${product.price}</p>
            <Button onClick={() => addToCart(product)}>Agregar al pedido</Button>
        </div>
    )

}