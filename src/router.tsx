import { createBrowserRouter } from 'react-router';
import App from './App';
import { AuthLayout } from './layouts/AuthLayout';
import { LoginPage } from './views/LoginPage';
import { RegisterPage } from './views/Register';
import { ShopPage } from './views/shop/ShopPage';
import { AuthenticatedLayout } from './layouts/AuthenticatedLayout';
import { OredersPage } from './views/shop/OrdersPage';

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
    }

]);


export default router;