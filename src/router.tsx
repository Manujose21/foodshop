import { createBrowserRouter } from 'react-router';
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
import { AUsersPage } from './views/admin/AUsersPage';
import { ACategoriesPage } from './views/admin/ACategoriesPage';
import { VerifyEmail } from './views/VerifyEmail';

const router = createBrowserRouter([

    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <LoginPage />
            },
        ]
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
            },
            {
                path: 'verify-email',
                element: <VerifyEmail />
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
                window.location.href = '/auth/login';
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
                element: <AUsersPage />
            },
            {
                path: "orders",
                element: <AOrdersPage />
            },
            {
                path: "products",
                element: <AProductsPage />
            },
            {
                path: "users",
                element: <AUsersPage />
            },
            {
                path: "categories",
                element: <ACategoriesPage />
            }
            
        ]
    }

]);


export default router;