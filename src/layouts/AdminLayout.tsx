import { Outlet } from "react-router"
import { Sidebar } from "../components/Sidebar"


export const AdminLayout = () => {

    return (
        <div className="flex flex-row min-h-screen">
            <Sidebar categories={[]} categorySelected={0} filter={() => {}} isAdmin={true} />
            <main className="flex flex-col mx-auto max-w-[1200px] w-full p-4 ">
                <Outlet></Outlet>
            </main>

        </div>

    )

}
