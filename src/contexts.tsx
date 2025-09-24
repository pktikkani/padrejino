import { createContext, type Dispatch, type SetStateAction } from "react";

// Define your types
interface Pizza {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    sizes: {
        S?: number;
        M?: number;
        L?: number;
    };
}

export type PizzaSize = "S" | "M" | "L";

export interface CartItem {
    pizza: Pizza;
    size: string;
    price?: string;
}

type CartContextType = [
    CartItem[],
    Dispatch<SetStateAction<CartItem[]>>
];

export const CartContext = createContext<CartContextType>([
    [],
    () => {}
]);