import Pizza from "./Pizza.tsx";

const intl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

interface Pizza {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    sizes: Record<string, number>; // { S: 12.50, M: 16.50, L: 20.50 }
}


export interface CartItem {
    pizza: Pizza;
    size: string; // "S" | "M" | "L" etc.
    price?: string; // Optional since you're calculating from pizza.sizes[size]
}

interface CartProps {
    cart: CartItem[];
    checkout: () => void;
}

export default function Cart({cart, checkout}: CartProps) {
    let total = 0;
    for (let i =0; i < cart.length; i++) {
        const current = cart[i];
        total += current.pizza.sizes[current.size];
    }

    return (
        <div className="cart">
            <h2>Cart</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        <span className="size">{item.size}</span> –
                        <span className="type">{item.pizza.name}</span> –
                        <span className="price">{item.price}</span>
                    </li>
                ))}
            </ul>
            <p>Total: {intl.format(total)}</p>
            <button onClick={checkout}>Checkout</button>
        </div>

    )
}