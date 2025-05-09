import { createRoot } from 'react-dom/client'
import router from './router.tsx'
import { RouterProvider } from 'react-router'
import { ShopProvider } from './context/useContextShop.tsx'
import './index.css'


createRoot(document.getElementById('root')!).render(
  
    <ShopProvider>
      <RouterProvider router={router} />
    </ShopProvider>
  
)

