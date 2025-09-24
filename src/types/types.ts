// src/types/types.ts
export interface PizzaSizes {
    S: number;
    M: number;
    L: number;
}

export type PizzaSize = keyof PizzaSizes;

export interface Pizza {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    sizes: PizzaSizes;
}

export interface CartItem {
    pizza: Pizza;
    size: PizzaSize;
    price: string;
}

// API types
export interface PastOrder {
    order_id: number;
    date: string;
    time: string;
}

export interface OrderItem {
    pizzaTypeId: string;
    name: string;
    category: string;
    description: string;
    quantity: number;
    price: number;
    total: number;
    size: PizzaSize;
    image: string;
}

export interface PastOrderResponse {
    order: {
        order_id: number;
        date: string;
        time: string;
        total: number;
    };
    orderItems: OrderItem[];
}