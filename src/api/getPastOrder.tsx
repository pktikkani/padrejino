interface PastOrderResponse {
    order: {
        order_id: number;
        date: string;
        time: string;
        total: number;
    };
    orderItems: OrderItem[];
}

interface OrderItem {
    pizzaTypeId: string;
    name: string;
    category: string;
    description: string;
    quantity: number;
    price: number;
    total: number;
    size: string;
    image: string;
}


export default async function getPastOrders(order: string | number | undefined): Promise<PastOrderResponse> {
    const response = await fetch(`/api/past-order/${order}`);
    const data = await response.json();
    return data;
}