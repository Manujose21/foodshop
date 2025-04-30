import { Outlet, useLoaderData, useNavigate } from "react-router"
import { Sidebar } from "../components/Sidebar"
import { useEffect } from "react";


export const AdminLayout = () => {

    const user = useLoaderData();
    const navigate = useNavigate();

    useEffect(() => {
        
        if (user?.role !== 'admin') {
            navigate('/shop');
        }

    })

    return (
        <div className="flex flex-row min-h-screen">
            <Sidebar categories={[]} categorySelected={0} filter={() => {}} isAdmin={true} />
            <main>
                <Outlet></Outlet>
            </main>

        </div>

    )

}
