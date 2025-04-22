import logo from '../public/img/logo.svg'
import { Button } from './components/Button'
import { Link } from 'react-router'
import './index.css'
import { useEffect } from 'react'
function App() {

  useEffect(() => {
    document.title = " Bienvenido a FoodShop"
  }, [])

  return (
    <>
    <div className='flex justify-center items-center flex-col  gap-8'>
      <h1 className='text-3xl font-bold'></h1>
      <img src={logo} alt="Logotipo"  className='w-96'/>
      <Link to={'/auth/login'}>
        <Button>Haz tu pedido</Button>
      </Link>
    </div>
    </>
  )
}

export default App
