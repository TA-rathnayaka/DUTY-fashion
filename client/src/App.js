import React from "react";
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

function App() {
  return (
    <BrowserRouter>
      <Navbar
        logged={false}
        items={[
          { name: "Contact", route: "/contact" },
          { name: "About", route: "/about" },
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
