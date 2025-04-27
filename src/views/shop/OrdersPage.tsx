import { useContext, useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import ShopContext from "../../context/useContextShop";



export const OredersPage = () => {

    const { user } = useAuth({ middleware: 'auth' });
    const { orders } = useContext(ShopContext)

    useEffect(() => {
        document.title = "Pedidos - FoodShop"
        window.scrollTo(0, 0)
    })
    console.log(orders)
    const formatStatus = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Pendiente';
            case 'completed':
                return 'Completado';
            case 'canceled':
                return 'Cancelado';
            default:
                return status;
        }  
    }

    const styleStatus = (status: string) => {
        switch (status) {
            case 'pending':
                return 'text-yellow-400 bg-[#ffda3338]';
            case 'completed':
                return 'text-green-400 bg-[#36ff3322]';
            case 'canceled':
                return 'text-red-500 bg-[#ff333322]';
            default:
                return 'text-red-500';
        }  
    }

    return (
        <>
            <div className="px-12 py-8 m-auto max-w-[1440px] w-full ">
                <h1 className="text-3xl font-bold mb-4">Pedidos de {user && user.name}</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {orders.map((order) => (
                        <div key={order.id} className="shadow-md rounded-lg p-4 border border-gray-300">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-semibold">Pedido #{order.id}</h2>
                                    <div className="">
                                        <p className={`font-semibold p-2 rounded-[999px] ${styleStatus(order.status)}`}>{formatStatus(order.status)}</p>
                                    </div>
                                </div>
                                <p className="font-semibold">Productos</p>
                                <ul className="list-disc pl-5 mb-2">
                                    {order.products.map((product) => (
                                        
                                        product.map((item) => (
                                            <li key={item.id} className="text-sm">{item.name} - ${item.price}</li>
                                        ))
                                    ))}
                                </ul>
                                <p className="font-semibold">Precio Total </p> 
                                <p className="">${order.total_price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
} 