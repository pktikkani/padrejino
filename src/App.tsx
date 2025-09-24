import {createRouter, RouterProvider} from "@tanstack/react-router";
import {routeTree} from "./routeTree.gen.ts";
import {StrictMode} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";



const router = createRouter({ routeTree });

const queryClient = new QueryClient();


declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const App = () => {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </StrictMode>
    )
}

export default App;