import {  useEffect, useState } from "react"
import { client } from "../../axios/client"
import { Category } from "../../types/interfaces"
import { dateFormat } from "../../helpers/dateFormat"


export const ACategoriesPage = () => {

    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        document.title = "Categorias - Admin"
        
        client.get('/categories', {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        })
            .then(res => {
                setCategories(res.data.data)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    return(
        <>
            <div className="flex flex-col ">
                <h1 className="text-2xl font-semibold">Usuarios</h1>

                <div>
                <table className="w-[100%] table-auto border-collapse border border-gray-800">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2">ID</th>
                            <th className="border border-gray-600 px-4 py-2">Categoria</th>
                            <th className="border border-gray-600 px-4 py-2">Fecha de creacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td className="border border-gray-600 px-4 py-2">{category.id}</td>
                                <td className="border border-gray-600 px-4 py-2">{category.name}</td>
                                <td className="border border-gray-600 px-4 py-2">{ dateFormat( category.created_at )}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}
