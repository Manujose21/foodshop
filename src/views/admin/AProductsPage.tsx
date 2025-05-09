import { useEffect, useState } from "react"
import { Product } from "../../types/interfaces"
import { client } from "../../axios/client"

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

export const AProductsPage = () => {

    const [products, setProducts] = useState<Product[]>([])
    const [pagination, setPaginate] = useState<PaginationData>()
    const [perPage, setPerPage] = useState(10)

    useEffect(() => {
        document.title = "Productos - Admin"

        client.get(`/products?per_page=${perPage}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        })
            .then(res => {
                setProducts(res.data.data)
                setPaginate({
                    links: res.data.links,
                    meta: res.data.meta
                })
            })
            .catch(err => {
                console.error(err)
            })
        

    }, [perPage])

    const handlePaginate = async (url: string) => {
        console.log(url)
        const productsRes = await client.get(`${url}&per_page=${perPage}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        })

        setProducts(productsRes.data.data)
        setPaginate({
            links: productsRes.data.links,
            meta: productsRes.data.meta
        })
    }


    return (
        <>
            <div className="flex flex-row min-h-screen">
                <main className="flex-1">
                    <h1 className="text-3xl font-bold">Productos</h1>

                    <div className="flex justify-between items-center mb-4">
                        <label>Mostrar por:</label>
                        <select 
                            className="bg-gray-700 text-white px-4 py-2 rounded" 
                            value={perPage} 
                            onChange={(e) => {
                                setPerPage(parseInt(e.target.value))
                            }}
                        >
                            <option value={10}>10 por páginas</option>
                            <option value={20}>20 por páginas</option>
                            <option value={50}>50 por páginas</option>
                        </select>
                    </div>

                    <table className="w-[100%] table-auto border-collapse border border-gray-800">

                        <thead>
                            <tr className="bg-gray-700">
                                <th className="border border-gray-600 px-4 py-2">ID</th>
                                <th className="border border-gray-600 px-4 py-2">Nombre</th>
                                <th className="border border-gray-600 px-4 py-2">Precio</th>
                                <th className="border border-gray-600 px-4 py-2">Categoria</th>
                                <th className="border border-gray-600 px-4 py-2">Imagen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="border border-gray-600 px-4 py-2">{product.id}</td>
                                    <td className="border border-gray-600 px-4 py-2">{product.name}</td>
                                    <td className="border border-gray-600 px-4 py-2">{product.price}</td>
                                    <td className="border border-gray-600 px-4 py-2">{product.category_id}</td>
                                    <td className="border border-gray-600 px-4 py-2"><img src={product.image} alt={product.name} /></td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    {pagination && pagination.meta && pagination.meta.current_page && pagination.meta.last_page && (
                        <div className="flex justify-center mt-4">
                            <button 
                                className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50" 
                                onClick={() => handlePaginate(pagination.links.prev || '')}
                                disabled={pagination.meta.current_page ===  1}
                            >
                                Anterior
                            </button>
                            
                            <span className="mx-2">Página {pagination.meta.current_page} de {pagination.meta.last_page}</span>
                            
                            <button 
                                className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50" 
                                onClick={() => handlePaginate(pagination.links.next || '')}
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