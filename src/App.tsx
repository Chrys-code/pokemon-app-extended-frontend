import './App.css';
import {
  RouterProvider,
} from "react-router-dom";

import { router } from './routes';
import { AuthContext } from "./contexts/auth";
import { PokemonDispatchContext } from './contexts/pokemon';
import { useContext, useEffect } from 'react';
import Login from './pages/login/login';
import { getUserPokemons, listAllPokemons } from './api/pokemons';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  // Use Auth context to grab auth data
  const authContext = useContext(AuthContext);
  const dispatch = useContext(PokemonDispatchContext);


  useEffect((): (() => void) | undefined => {

    // Check for user
    if (!authContext?.isAuthenticated) return;
    if (!authContext.id) return;

    (async () => {

      // get pokemons
      const allPokemonsData = await listAllPokemons();
      const userPokemonsData = await getUserPokemons();

      // set pokemons for user and to list all
      dispatch && dispatch({
        type: "init",
        userPokemons: userPokemonsData.pokemons,
        allPokemons: allPokemonsData.results
      })

    })();
  }, [authContext])

  // If user is authenticated show router
  if (authContext?.isAuthenticated) {
    return <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  }

  // If user is not authenticated show login screen
  return (
    <div className="App" >
      <Login />
      <ToastContainer />
    </div>
  );
}

export default App;