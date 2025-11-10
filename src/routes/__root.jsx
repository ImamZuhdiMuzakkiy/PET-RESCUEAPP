import { useState } from "react"
import { createRootRoute } from "@tanstack"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

import Header from "../Header"
import { CartContext } from "../contexts"
import PizzaOfTheDay from "../PizzaOfTheDay"

export const Route = createRootRoute({
    component: () => {
        const cartHook = useState([])
        return (
            // React Fragment <>
            <>
            <CartContext.Provider value={cartHook}>
                <Header />
                <Outlet />
                <PizzaOfTheDay />
            </CartContext.Provider>
            <TanStackRouterDevtools />
            </>
        )
    }
})