import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main";
import Pokemon from "../pages/pokemon/pokemon";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/pokemon",
        element: <Pokemon />,
    },
]);