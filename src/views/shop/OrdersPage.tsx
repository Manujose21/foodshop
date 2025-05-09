import { useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import useSWR from "swr";
import { client } from "../../axios/client";
import { Order } from "../../types/interfaces";
import { Button } from "../../components/Button";
import { statusStyles } from "../../helpers/statusStyles";

interface Link {
    next: string;
    prev: string;
    first: string;
    last: string;
} 

interface PaginateOrder {
    data: Order[];
    links: Link;
    meta: {
        total: number;
        to: number;
        from: number;
        current_page: number; 
        last_page: number;
        path: string;
        per_page: number;
        links: Link[];

    };
}
export const OredersPage = () => {

    const { user } = useAuth();
    const { data: orders } = useSWR<PaginateOrder>('/orders', () => 
            client.get('/orders', {
                headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
            })
            .then(res =>{
                console.log(res.data)
                return res.data;
            })
            .catch((e) => {
              throw new Error(e.response?.data?.message || 'Failed to fetch products data');
            }), {
            // refreshInterval: 30000, // 30 seconds
        });
    

    useEffect(() => {
        document.title = "Pedidos - FoodShop"
        window.scrollTo(0, 0)
    })
    // console.log(orders)
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

 
    const handlePaginate = (url: string) => {
        if (orders && orders?.meta.last_page > orders?.meta.current_page) {
            client.get(url, {
                headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
            })
            .then(res =>{
                console.log(res.data)
                return res.data;
            })
            .catch((e) => {
              throw new Error(e.response?.data?.message || 'Failed to fetch products data');
            });
        }
    }

    return (
        <>
            <div className="px-12 py-8 m-auto max-w-[1440px] w-full ">
                <h1 className="text-3xl font-bold mb-4">Pedidos de {user && user.name}</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {orders && orders?.data.map((order) => (
                        <div key={order.id} className="shadow-md rounded-lg p-4 border border-gray-300">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-semibold">Pedido #{order.id}</h2>
                                    <div className="">
                                        <p className={`font-semibold p-2 rounded-[999px] ${statusStyles(order.status)}`}>{formatStatus(order.status)}</p>
                                    </div>
                                </div>
                                <p className="font-semibold">Productos</p>
                                <ul className="list-disc pl-5 mb-2">
                                    {order.products.map((item) => (
                                        <li key={item.id} className="text-sm">{item.name} - ${item.price}</li>                                        
                                    ))}
                                </ul>
                                <p className="font-semibold">Precio Total </p> 
                                <p className="">${order.total_price}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {orders && (<>
                    <div className="flex justify-center items-center mt-4 gap-1">
                        <Button >anterior</Button>
                        <Button onClick={() => handlePaginate(orders.links.next)}>anterior</Button>
                    </div>
                </>)}
            </div>

        </>
    )
} 