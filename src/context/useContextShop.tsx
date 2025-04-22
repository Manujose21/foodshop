import { createContext, useState } from 'react';
import { Category, Product } from '../types/interfaces';
import { client } from '../axios/client';
import useSWR from 'swr';

interface Context {
    cart: Product[];
    total: number;
    products: Product[];
    quantity: number;
    category: number;
    categories: Category[];
    addToCart: (item: Product) => void;
    removeFromCart: (item: Product) => void;
    clearCart: () => void;
    filter: (category: number) => void;
    getProducts: ( response: Product[] ) => Promise<void>,
    getCategories: () => Promise<void>,
}

const initialContex: Context = {
    cart: [],
    total: 0,
    products: [],
    quantity: 0,
    category: 0,
    categories: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    filter: () => {},
    getProducts: async () => Promise.resolve(),
    getCategories: () => Promise.resolve(),
}

interface IState {
    cart: Product[];
    category: number;
    products: Product[];
    categories: Category[];
    total: number;
    quantity: number;
}

const ShopContext = createContext(initialContex);

export const ShopProvider = ({ children  }: { children: React.ReactNode }) => {
    const [state, setState] = useState<IState>({
        cart: [],
        category: 0,
        products: [],
        categories: [],
        total: 0,
        quantity: 0,
    });

    const { data: response } = useSWR('/products', () => 
        client.get('/products')
        .then(res =>{
             getProducts( res.data.data )
            return res.data;
        })
        .catch((e) => {
          throw new Error(e.response?.data?.message || 'Failed to fetch products data');
        }), {
        refreshInterval: 30000, // 30 seconds
      });

   console.log(response);
    const addToCart = (item: Product) => {
        setState((prevState: IState ) => {
            const updatedCart = [...prevState.cart, item];
            const updatedTotal = updatedCart.reduce((acc, curr) => acc + curr.price, 0);
            const updatedQuantity = updatedCart.length;
            return { ...prevState, cart: updatedCart, total: updatedTotal, quantity: updatedQuantity };
        });
    };

    const removeFromCart = (item: Product) => {
        setState((prevState: IState) => {
            const updatedCart = prevState.cart.filter((cartItem) => cartItem.id !== item.id);
            const updatedTotal = updatedCart.reduce((acc, curr) => acc + curr.price, 0);
            const updatedQuantity = updatedCart.length; 
            return { ...prevState, cart: updatedCart, total: updatedTotal, quantity: updatedQuantity };
        });
    }

    const clearCart = () => {
        setState( (prevState: IState) => ({
            cart: [],
            category: prevState.category,
            products: prevState.products,
            categories: prevState.categories,
            total: 0,
            quantity: 0,
        }));
    };

    const getProducts = async ( response: Product[]) => {
        

        setState((prevState: IState) => {
            return { ...prevState, products: response };
        });
    }


    const getCategories = async () => {
        try {

            const response = (await client.get('/categories'))?.data;
            const data = response.data;
            
            setState((prevState: IState) => {
                return { ...prevState, categories: data };
            });

        } catch (error) {
            console.log(error);
        }
    }


    const filter = (category: number) => {
        setState((prevState: IState) => {
            return { ...prevState, category: category};
        });
    }

    return <ShopContext.Provider value={{
        ...state,
        addToCart,
        removeFromCart,
        clearCart,
        getProducts,
        getCategories,
        filter
    }} > 
        {children} 
    </ShopContext.Provider>
}

export default ShopContext;

