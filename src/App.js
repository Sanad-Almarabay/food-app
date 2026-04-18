import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import SidebarCart from "./components/SidebarCart";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import "./App.css";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (food) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === food.name);
      if (existing) {
        return prev.map((i) =>
          i.name === food.name ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        return [...prev, { ...food, qty: 1 }];
      }
    });
  };

  const increaseQty = (name) => {
    setCart((prev) =>
      prev.map((i) =>
        i.name === name ? { ...i, qty: i.qty + 1 } : i
      )
    );
  };

  const decreaseQty = (name) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.name === name ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  return (
    <Router>
      {/* 🔒 NOT LOGGED IN → ONLY LOGIN/SIGNUP */}
      {!user ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <>
          {/* 🔓 LOGGED IN → FULL APP */}
          <Navbar openCart={() => setIsCartOpen(true)} />

          <SidebarCart
            cart={cart}
            isOpen={isCartOpen}
            closeCart={() => setIsCartOpen(false)}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
          />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu addToCart={addToCart} />} />
           <Route 
  path="/checkout" 
  element={<Checkout cart={cart} setCart={setCart} />} 
/>
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;