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
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./Pages/ContactPage/Contact";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import AdminPage from "./Pages/AdminPage";
import { faAddressBook, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function App() {
  const [logged, setLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("/status");
        setLogged(response.data.success);
        setIsAdmin(response.data.success);
      } catch (error) {
        console.error("Authentication check failed:", error);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <BrowserRouter>
      <Navbar
        logged={logged}
        isAdmin={isAdmin}
        items={[
          { icon: { icon: faAddressBook }, path: "/contact" },
          { icon: { icon: faInfoCircle }, path: "/about" },
        ]}
      />
      <Routes>
        <Route index element={<HomePageContent />} />
        <Route path="/" element={<HomePageContent />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/cart" element={<CartItems />} />
        </Route>
        <Route
          path="/collection/:gender/:category"
          element={<ListOfProducts />}
        />
        <Route path="/collection/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
