import React from "react";
import Navbar from "./components/Navbar";
import HomePageContent from "./Pages/HomePageContent";
import About from "./Pages/About";
import Stock from "./Pages/Stock";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import ListOfProducts from "./Pages/ListOfProducts";
import ProductPage from "./Pages/ProductPage";
import CartItems from "./Pages/CartItems";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./Pages/Contact";
import ProtectedRoutes from "./utils/ProtectedRoutes";

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
