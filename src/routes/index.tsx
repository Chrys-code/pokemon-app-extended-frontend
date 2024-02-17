import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main";
// import Pokemon from "../pages/pokemon/pokemon";
import MainLayout from "../layouts/main/mainLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <MainPage />,
            },
            // {
            //     path: "/pokemon",
            //     element: <Pokemon />,
            // },
        ]
    },

]);