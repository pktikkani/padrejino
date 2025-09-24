import { createContext, type Dispatch, type SetStateAction } from "react";
import type {CartItem} from "./types/types.ts";

// Define your types
type CartContextType = [
    CartItem[],
    Dispatch<SetStateAction<CartItem[]>>
];

export const CartContext = createContext<CartContextType>([
    [],
    () => {
        throw new Error("CartContext used outside provider");
    }
]);