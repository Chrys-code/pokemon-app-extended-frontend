import './App.css';
import {
  RouterProvider,
} from "react-router-dom";

import { router } from './routes';
import { AuthContext } from "./contexts/auth";
import { useContext } from 'react';
import Login from './pages/login/login';


function App() {

  // Use Auth context to grab auth data
  const authContext = useContext(AuthContext);

  // If user is authenticated show router
  if (authContext?.isAuthenticated) {
    return <RouterProvider router={router} />
  }

  // If user is not authenticated show login screen
  return (
    <div className="App" >
      <Login />
    </div>
  );
}

export default App;