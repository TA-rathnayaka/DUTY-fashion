import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import HomePageContent from "./Pages/HomePageContent/HomePageContent";
import About from "./Pages/About";
import Stock from "./Pages/Stock";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import ListOfProducts from "./Pages/ListOfProducts";
import ProductPage from "./Pages/ProductPage/ProductPage";
import CartItems from "./Pages/CartItemsPage/CartItems";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Contact from "./Pages/ContactPage/Contact";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import AdminPage from "./Pages/AdminPage";
import axios from "axios";
import AuthProvider from "./Providers/AuthProvider";
import { faAddressBook, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [logged, setLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("/status");
        setLogged(response.data.success);
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setLogged(false);
        setIsAdmin(false);
      }
    };

    checkAuthStatus();
  }, []);

  const updateLoginState = (isLogged, isAdminStatus) => {
    setLogged(isLogged);
    setIsAdmin(isAdminStatus);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar
            items={[
              { icon: { icon: faAddressBook }, path: "/contact" },
              { icon: { icon: faInfoCircle }, path: "/about" },
            ]}
          />
          <Outlet />
        </>
      ),
      children: [
        { index: true, element: <HomePageContent /> },
        { path: "about", element: <About /> },
        {
          path: "login",
          element: <Login updateLoginState={updateLoginState} />,
        },
        {
          path: "signup",
          element: <Signup updateLoginState={updateLoginState} />,
        },
        { path: "contact", element: <Contact /> },
        { path: "stock", element: <Stock /> },
        {
          path: "admin",
          element: (
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <CartItems />
            </ProtectedRoute>
          ),
        },
        { path: "collection/:gender/:category", element: <ListOfProducts /> },
        { path: "collection/:id", element: <ProductPage /> },
      ],
    },
  ]);

  return (
    <AuthProvider isSignedIn={logged} isAdmin={isAdmin}>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
