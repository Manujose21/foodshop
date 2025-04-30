import { createBrowserRouter } from 'react-router';
import App from './App';
import { AuthLayout } from './layouts/AuthLayout';
import { LoginPage } from './views/LoginPage';
import { RegisterPage } from './views/Register';
import { ShopPage } from './views/shop/ShopPage';
import { AuthenticatedLayout } from './layouts/AuthenticatedLayout';
import { OredersPage } from './views/shop/OrdersPage';
import { AdminLayout } from './layouts/AdminLayout';
import { AOrdersPage } from './views/admin/AOrdersPage';
import { AProductsPage } from './views/admin/AProductsPage';
import { verifyIsAdmin } from './helpers/verifyIsAdmin';
import { checkUser } from './helpers/checkUser';

const router = createBrowserRouter([

    {
        path: '/',
        element: <App />,
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element:<>
                    <LoginPage />
                </> 
            },
            {
                path: 'register',
                element: 
                <>
                    <RegisterPage />
                </>
            }
        ]
    },
    {
        path: "/shop",
        element: <AuthenticatedLayout />,
        loader: async () => {
            const isAuth = await checkUser();
            console.log(isAuth)
            if (!isAuth) {
                throw new Response('No autorizado', { status: 401 });
            }
            return isAuth;
        },
        children: [
            {
                index: true,
                
                element: <>
                    <ShopPage />
                </> 
                
            },
            {
                path: "orders",
                element: <OredersPage />
            }
        ],
    },
    {
        path: "/admin",
        loader: async () => {
            const isAuth = await verifyIsAdmin();
            if (!isAuth) {
                throw new Response('No autorizado', { status: 401 });
            }
            return isAuth;
        },
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element:<></>
            },
            {
                path: "orders",
                element: <AOrdersPage />
            },
            {
                path: "products",
                element: <AProductsPage />
            }
        ]
    }

]);


export default router;