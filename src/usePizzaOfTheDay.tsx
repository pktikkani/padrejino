import { useState, useEffect, useDebugValue } from "react";

interface PizzaOfTheDay {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    sizes: Record<string, number>; // e.g., { S: 12.50, M: 16.50, L: 20.50 }
}

export const usePizzaOfTheDay = () => {
    const [pizzaOfTheDay, setPizzaOfTheDay] = useState<PizzaOfTheDay | null>(null);

    useDebugValue(pizzaOfTheDay ? `${pizzaOfTheDay.name}` : "Loading...");

    useEffect(() => {
        async function fetchPizzaOfTheDay() {
            console.log("Fetching pizza of the day...");
            const response = await fetch("/api/pizza-of-the-day");
            console.log("API response:", response.status, response.statusText);
            const data = await response.json();
            setPizzaOfTheDay(data);
        }

        fetchPizzaOfTheDay().catch(console.error);
    }, []);

    return pizzaOfTheDay;
};