import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./utils/AuthProvider.jsx";
import Layout from "./components/Layout.jsx";
import LandingPage from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx";

function App() {
  const router = createBrowserRouter([
    {
        path: "",
        element: <LandingPage />,
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <Register />,
            }
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
