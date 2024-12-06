import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./utils/AuthProvider.jsx";
import Layout from "./components/Layout.jsx";
import LandingPage from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx";
import ProtectedRouteUser from './utils/ProtectedRouteUser.jsx';
import Character from './pages/Character.jsx';

function App() {

  const token = sessionStorage.getItem("token");

  const router = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <LandingPage />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            }
        ],
    },
    {
      path: "",
      element: <ProtectedRouteUser token={token} />,
      children: [
          {
              path: "home",
              element: <Home />,
          },
          {
              path: "character",
              element: <Character />,
          },
      ],
  },
    
]);
  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
