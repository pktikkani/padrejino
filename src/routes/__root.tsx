import { Outlet, createRootRoute } from '@tanstack/react-router'
import Header from "../Header";
import PizzaOfTheDay from "../PizzaOfTheDay.tsx";
import {useState} from "react";
import { CartContext } from "../contexts.tsx";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import type {CartItem} from "../Cart.tsx";

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
    const cartHook = useState<CartItem[]>([])
    return (
        <>
            <CartContext.Provider value={cartHook}>
                <div>
                    <Header />
                    <Outlet />
                    <PizzaOfTheDay />
                </div>
            </CartContext.Provider>
            <TanStackRouterDevtools />
        </>
    )
}
