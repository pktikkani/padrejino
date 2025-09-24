import { useState, useEffect, useContext } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { CartContext } from "../contexts";
import Cart from "../Cart";
import Pizza from "../Pizza";
import * as React from "react";

// Pizza related types
interface PizzaSizes {
    S?: number;
    M?: number;
    L?: number;
}

interface Pizza {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    sizes: PizzaSizes;
}

// Cart related types
type PizzaSize = "S" | "M" | "L";


// feel free to change en-US / USD to your locale
const intl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export const Route = createLazyFileRoute("/order")({
    component: Order,
});

function Order() {
    const [pizzaType, setPizzaType] = useState<string>("pepperoni");
    const [pizzaSize, setPizzaSize] = useState<PizzaSize>("M");
    const [pizzaTypes, setPizzaTypes] = useState<Pizza[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [cart, setCart] = useContext(CartContext);

    async function checkout(): Promise<void> {
        setLoading(true);

        await fetch("/api/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cart,
            }),
        });

        setCart([]);
        setLoading(false);
    }

    let price: string = ""
    let selectedPizza: Pizza | undefined;
    if (!loading) {
        selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
        price = intl.format(
            selectedPizza?.sizes?.[pizzaSize] ?? 0
        );
    }

    useEffect(() => {
        fetchPizzaTypes().catch(console.error);
    }, []);

    async function fetchPizzaTypes() {
        const pizzasRes = await fetch("/api/pizzas");
        const pizzasJson = await pizzasRes.json();
        setPizzaTypes(pizzasJson);
        setLoading(false);
    }

    return (
        <div className="order-page">
            <div className="order">
                <h2>Create Order</h2>
                <form
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        if (selectedPizza) {  // Add this check
                            setCart([
                                ...cart,
                                { pizza: selectedPizza, size: pizzaSize, price },
                            ]);
                        }
                    }}
                >
                    <div>
                        <div>
                            <label htmlFor="pizza-type">Pizza Type</label>
                            <select
                                onChange={(e) => setPizzaType(e.target.value)}
                                name="pizza-type"
                                value={pizzaType}
                            >
                                {pizzaTypes.map((pizza) => (
                                    <option key={pizza.id} value={pizza.id}>
                                        {pizza.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="pizza-size">Pizza Size</label>
                            <div>
                <span>
                  <input
                      onChange={(e) => setPizzaSize(e.target.value as PizzaSize)}
                      checked={pizzaSize === "S"}
                      type="radio"
                      name="pizza-size"
                      value="S"
                      id="pizza-s"
                  />
                  <label htmlFor="pizza-s">Small</label>
                </span>
                                <span>
                  <input
                      onChange={(e) => setPizzaSize(e.target.value as PizzaSize)}
                      checked={pizzaSize === "M"}
                      type="radio"
                      name="pizza-size"
                      value="M"
                      id="pizza-m"
                  />
                  <label htmlFor="pizza-m">Medium</label>
                </span>
                                <span>
                  <input
                      onChange={(e) => setPizzaSize(e.target.value as PizzaSize)}
                      checked={pizzaSize === "L"}
                      type="radio"
                      name="pizza-size"
                      value="L"
                      id="pizza-l"
                  />
                  <label htmlFor="pizza-l">Large</label>
                </span>
                            </div>
                        </div>
                        <button type="submit">Add to Cart</button>
                    </div>
                    {loading ? (
                        <h3>LOADING …</h3>
                    ) : selectedPizza ? (
                        <div className="order-pizza">
                            <Pizza
                                name={selectedPizza.name}
                                description={selectedPizza.description}
                                image={selectedPizza.image}
                            />
                            <p>{price}</p>
                        </div>
                    ): null }
                </form>
            </div>
            {loading ? <h2>LOADING …</h2> : <Cart checkout={checkout} cart={cart} />}
        </div>
    );
}