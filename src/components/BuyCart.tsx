import { useContext } from "react"
import { Button } from "./Button"
import ShopContext from "../context/useContextShop";
import { client } from "../axios/client";
import toast, { Toaster } from 'react-hot-toast';

export const BuyCart = () => {
    const { cart, removeFromCart , total, clearCart } = useContext(ShopContext);


    
    const handleOrder = () => {
        
        if (cart.length === 0) {
            return;
        }

        const order = {
            products: cart.map((product) => ({
                id: product.id,
                category_id: product.category_id,
                name: product.name,
                price: product.price,
                image: product.image,
            })),
            total_price: total,
        };

        client.post('/order', order, {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        }).then(() => {
            clearCart();
            toast.success('Pedido realizado con éxito', {
                duration: 4000,
                position: 'top-right',
                style: {
                    background: '#222222',
                    color: '#fff',
                },
            });
        }).catch((error) => {
            console.error(error);
        });

    }

    return (
        <>
            <aside className="bg-[#222222] text-white w-1/6 h-screen sticky top-0 right-0">
                <Toaster />         
                <div className="p-6 h-full flex flex-col justify-between">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-xl font-semibold flex gap-4">
                            Carrito 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>

                        </h1>
                        <div className="flex flex-col gap-2 overflow-y-auto h-[75vh]">
                            { cart.length === 0 
                            ? <p className="text-gray-400 text-center">No hay productos en el carrito</p> 
                            : cart.map((product) => (
                                <div key={product.id}>
                                    <img src={`/img/${product.image}.jpg`} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                                    <div key={product.id} className="flex justify-between">
                                        <span>{product.name}</span>
                                        <span>${product.price}</span> <br />
                                    </div>
                                    
                                    <Button className="text-xs" onClick={() => removeFromCart(product)}>Eliminar</Button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        { cart.length === 0
                        ? ''
                        : <div className="flex justify-between mt-2">
                                <span className="text-gray-400">Total a pagar</span>
                                <span>${ total.toFixed(2) }</span>
                            </div> 
                        } 

                        <div className="flex gap-4">
                            <Button onClick={handleOrder} disabled={cart.length === 0} className="text-sm">
                                Realizar pedido
                            </Button>
                            <Button disabled={cart.length === 0} className="text-sm bg-red-500 hover:bg-red-600" onClick={() => clearCart()}>
                                Limpiar carrito
                            </Button>
                        </div>  
                    </div>
                </div>

            </aside>
        </>
    )
}