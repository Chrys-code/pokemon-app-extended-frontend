import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main";
import MainLayout from "../layouts/main/mainLayout";
import PokemonInfo from "../pages/pokemonInfo/pokemonInfo";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <MainPage />,
            },
            {
                path: "/pokemon",
                element: <PokemonInfo />,
            },
        ]
    },

]);