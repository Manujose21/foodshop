import useSWR from "swr"
import { client } from "../../axios/client"
import { User } from "../../types/interfaces"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Modal } from "../../components/Modal"


interface PaginationData {
    data: User[],
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

export const AUsersPage = () => {

    const [ users, setUsers ] = useState<PaginationData>();
    const [isOpen, setIsOpen] = useState(false);
    useSWR('/users', () => 
        client.get('/users', {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        })
            .then(res => {
                console.log(res.data)
                setUsers(res.data)
            })
            .catch(err => {
                throw Error(err.response.data.message)
            })
    )

    const [userSelected, setUserSelected] = useState<User | null>(null)

    const handlePaginate = async (url: string) => {
        const usersRes = await client.get(url, {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        })

        setUsers(usersRes.data)
            
    }

    const handleDeleteUser = (user: User) => {

        setUserSelected(user)
        setIsOpen(true)

    }

    const deleteUser = async () => {
        if(!userSelected) return

        const res = await client.delete(`/user/${userSelected.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        })

        if(res.status === 200) {
            toast.success('Usuario eliminado con éxito', {
                duration: 4000,
                position: 'top-right',
                style: {
                    background: '#222222',
                    color: '#fff',
                },
            })
            setUsers((prev) => ({
                ...prev!,
                data: prev!.data.filter(user => user.id !== userSelected?.id)
            }))
        } else {
            toast.error('Error al eliminar el usuario', {
                duration: 4000,
                position: 'top-right',
                style: {
                    background: '#222222',
                    color: '#fff',
                },
            })
        }
    }

    return(
        <>
            <Toaster></Toaster>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} cancelButton={false}>
                <div>
                    Seguro que deseas eliminar al usuario {userSelected?.name}?
                    <div className="flex justify-end mt-4">
                        <button 
                            className="bg-gray-700 text-white px-4 py-2 rounded mr-2" 
                            onClick={() => setIsOpen(false)}
                        >
                            Cancelar
                        </button>
                        <button 
                            className="bg-gray-700 text-white px-4 py-2 rounded" 
                            onClick={() => {
                                deleteUser()
                                setIsOpen(false)
                            }}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </Modal>
            <div className="flex flex-col ">
                <h1 className="text-2xl font-semibold">Usuarios</h1>
                <table className="w-[100%] table-auto border-collapse border border-gray-800">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2">ID</th>
                            <th className="border border-gray-600 px-4 py-2">Nombre</th>
                            <th className="border border-gray-600 px-4 py-2">Email</th>
                            <th className="border border-gray-600 px-4 py-2">Rol</th>
                            <th className="border border-gray-600 px-4 py-2">Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.data.map((user: User) => (
                            <tr key={user.id}>
                                <td className="border border-gray-600 px-4 py-2">{user.id}</td>
                                <td className="border border-gray-600 px-4 py-2">{user.name}</td>
                                <td className="border border-gray-600 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-600 px-4 py-2">{user.role}</td>
                                <td className="border border-gray-600 px-4 py-2">
                                    <button 
                                        className="bg-gray-700 text-white px-4 py-2 rounded" 
                                        onClick={() => handleDeleteUser(user)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    { users && users.meta && users.meta.current_page && users.meta.last_page && (
                      <>
                        <div className="flex justify-center mt-4"> 
                            
                            <button 
                                className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50" 
                                onClick={() => handlePaginate(users.links.prev || '')}
                                disabled={users.meta.current_page ===  1}
                            >
                                Anterior
                            </button>
                            
                            <span className="mx-2">Página {users.meta.current_page} de {users.meta.last_page}</span>
                            
                            <button 
                                className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50" 
                                onClick={() => handlePaginate(users.links.next || '')}
                                disabled={users.meta.current_page === users.meta.last_page}    
                            >
                                Siguiente
                            </button>
                        </div>
                        <p className="text-gray-400"> Viendo {users.meta.to} de {users.meta.total} </p>
                      </>
                            
                    )}
                </div>
            </div>
        </>
    )

}
