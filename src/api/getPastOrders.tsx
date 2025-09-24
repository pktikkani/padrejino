interface PastOrder {
    order_id: number;
    date: string;
    time: string;
}

export default async function getPastOrders(page: number): Promise<PastOrder[]> {
    const response = await fetch(`/api/past-orders?page=${page}`);
    const data = await response.json();
    return data;
}