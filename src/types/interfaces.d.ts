export interface Category {
    icon: string;
    name: string;
    id: number
}
type Categories = "all" | "Hamburguesas" | "Pizzas" | "Café" | "Donas" | "Pasteles" | "Galletas";
export interface Product {
    id: number;
    name: string;
    price: number;
    category_id: number;
    image: string;   
}

export interface CartItem extends Product {
    quantity: number;
}

export interface User {
    id: number,
    email: string,
    name: string,
    address: string,
    phone: string,
    email_verified_at: string,
    created_at: string,
    updated_at: string
    
}