import {  useEffect, useState } from "react";
// import { useLoaderData } from "react-router";
import { Order, User } from "../../types/interfaces";
import { client } from "../../axios/client";
import { Modal } from "../../components/Modal";
import { statusStyles } from "../../helpers/statusStyles";
import { dateFormat } from "../../helpers/dateFormat";
import toast, { Toaster} from "react-hot-toast";
import { useNavigate } from "react-router";

interface AllOrders extends Order {
    created_at: string,
    user: User
}

interface PaginationData {
    links:{
        first: string,
        last: string,
        prev: string | null,
        next: string | null,
    },
    meta: {
        current_page: number,
        from: number,
        last_page: number,
        links: {
            url: string | null,
            label: string,
            active: boolean
        }[],
        path: string,
        per_page: number,
        to: number,
        total: number
    }
}

export const AOrdersPage = () => {

    // const navigate = useNavigate();
    // const  user = useLoaderData();
    const [orders, setOrders] = useState<Order[]>();
    const [isOpen, setIsOpen] = useState(false);
    const [pagination, setPagination] = useState<PaginationData>();
    const [statusSelected, setStatusSelected] = useState<string>('pending');
    const [order, setOrder] = useState<Order>();
    const navigate = useNavigate();
    const handleModal = (order: Order) => {
        setOrder(order)
        setIsOpen(true)
    }

    const handleCompleteOrder = (status: string) => {
        if (!order) return;  
        console.log(localStorage.getItem('auth_token'))
        client.post(`/proccess_order/${order.id }`, {status},{
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }  
        }).then(res => {
            console.log(res.data)
            toast.success(`Orden ${status === "cancelled" ? "cancelada": "completada" } con éxito`, {
                duration: 4000,
                position: 'top-right',
                style: {
                    background: '#222222',
                    color: '#fff',
                },
            });

            navigate('/admin/orders');
        }).catch(err => {
            console.log(err.response.data.message)
        })
    }

    useEffect(() => {
        client.get('/orders/all', {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        }).then(res => {
            const pendingOrders = res.data.data.filter((order: AllOrders) => order.status === statusSelected);
            setOrders(pendingOrders);
            setPagination({
                links: res.data.links,
                meta: res.data.meta
            })
        }).catch(err => {
            console.log(err.response.data.message)
            // navigate('/login')
        })
    }, [statusSelected])


    return (
        <>
        <Toaster></Toaster>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h1>Detalles</h1>
                <div className="flex flex-col gap-4 mt-4">
                    <p className="text-sm ">ID: {order?.id}</p>
                    {order && order.user && (
                        <>
                            <p className="text-sm ">Usuario: {order?.user.name}</p>
                            <p className="text-sm ">Email: {order?.user.email}</p>
                            <p className="text-sm ">Dirección: {order?.user.address}</p>
                            <p className="text-sm ">Teléfono: {order?.user.phone}</p>
                        </>
                        )
                    }
                    <p className="text-sm ">Estado: 
                        <span className={`font-semibold p-2 rounded-[999px] ml-2 ${order && statusStyles(order.status)}`} >
                            {order?.status}
                        </span>
                        </p>
                    <div className="flex flex-col gap-2">
                        <button onClick={() => handleCompleteOrder("cancelled")} className="bg-red-500 text-amber-50 p-2 rounded-lg cursor-pointer">Cancelar orden</button>
                        <button onClick={() => handleCompleteOrder("completed")} className="bg-green-600 text-amber-50 p-2 rounded-lg cursor-pointer">Completar Orden</button>
                    </div>
                    {order && <p className="text-sm ">Fecha: { dateFormat(order.created_at) }</p>}
                    <ul>
                        <span className="font-semibold mb-2">
                            Productos del pedido
                        </span>
                        {order?.products.map((product) => (
                            <li key={product.id} className="text-sm list-disc">
                                <p>{product.name} - ${ product.price }</p>
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm ">Precio Total: ${order?.total_price}</p>

                </div>
            </Modal>
            <div className="flex flex-row min-h-screen">
                <main className="flex-1">
                    <h1 className="text-3xl font-bold">Ordenes</h1>
                    <div>
                        <label htmlFor="">Filtrar por estado</label>
                        <select name="" id="" onChange={(e) => setStatusSelected(e.target.value)}  className="bg-gray-700 text-white p-2 rounded-lg ml-2">
                            <option value="pending">Pendientes</option>
                            <option value="completed">Completadas</option>
                            <option value="cancelled">Canceladas</option>
                        </select>
                    </div>
                    {orders && orders.length > 0 ? (
                        <table className="w-full mt-4 border-collapse border border-gray-700">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="border border-gray-700 px-4 py-2">ID</th>
                                    <th className="border border-gray-700 px-4 py-2">Usuario</th>
                                    <th className="border border-gray-700 px-4 py-2">Total</th>
                                    <th className="border border-gray-700 px-4 py-2">Estado</th>
                                    <th className="border border-gray-700 px-4 py-2">Acciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="border border-gray-700 px-4 py-2">{order.id}</td>
                                            {order.user && <td className="border border-gray-700 px-4 py-2">{order.user.name}</td>}
                                            <td className="border border-gray-700 px-4 py-2">${order.total_price}</td>
                                            <td className="border border-gray-700 px-4 py-2 flex items-center justify-center">
                                                <span className={`rounded-[999px] p-2 ${statusStyles(order.status)}`}>{order.status}</span></td>
                                            <td className="border border-gray-700 px-4 py-2">
                                                <button onClick={()=> handleModal(order)} className="bg-blue-500 text-white px-4 py-2 rounded">Ver</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="mt-4">No hay ordenes aún.</p>
                        )}
                    
                    {pagination && pagination.meta && pagination.meta.current_page && pagination.meta.last_page && (
                        <div className="flex justify-center mt-4">
                            <button 
                                className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50" 
                                onClick={() => setStatusSelected(pagination.links.prev || '')}
                                disabled={pagination.meta.current_page ===  1}
                            >
                                Anterior
                            </button>
                            
                            <span className="mx-2">Página {pagination.meta.current_page} de {pagination.meta.last_page}</span>
                            
                            <button 
                                className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50" 
                                onClick={() => setStatusSelected(pagination.links.next || '')}
                                disabled={pagination.meta.current_page === pagination.meta.last_page}    
                            >
                                Siguiente
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </>
    )

}
