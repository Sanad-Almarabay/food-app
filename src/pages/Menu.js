import { useState } from "react";
import FoodCard from "../components/FoodCard";
import { motion, AnimatePresence } from "framer-motion";

/* 🎬 ANIMATION VARIANTS */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

/* 🧠 MENU DATA */
const foods = [
  { name: "Classic Burger", price: 500, category: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80" },
  { name: "Cheese Burger", price: 600, category: "Burger", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80" },

  { name: "Fries", price: 300, category: "Sides", image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=400&q=80" },
  { name: "Nuggets", price: 450, category: "Sides", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80" },

  { name: "Pasta", price: 600, category: "Meals", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=400&q=80" },
  { name: "Hot Dog", price: 400, category: "Meals", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=400&q=80" },

  { name: "Cola", price: 150, category: "Drinks", image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=400&q=80" },
  { name: "Milkshake", price: 250, category: "Drinks", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80" },

  { name: "Chocolate Cake", price: 350, category: "Sweets", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80" },
  { name: "Donuts", price: 250, category: "Sweets", image: "https://images.unsplash.com/photo-1587731556938-38755b4803a6?auto=format&fit=crop&w=400&q=80" },
  { name: "Ice Cream", price: 200, category: "Sweets", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=400&q=80" }
];

/* 🎯 CATEGORIES */
const categories = ["All", "Burger", "Sides", "Meals", "Drinks", "Sweets"];

export default function Menu({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  /* 🔥 FILTER LOGIC */
  const filteredFoods = foods.filter((food) => {
    const matchCategory =
      selectedCategory === "All" || food.category === selectedCategory;

    const matchSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Menu 🍽️</h2>

      {/* 🔍 SEARCH BAR */}
      <div className="search-container">
        <div className="search-box">
          <span className="search-icon">🔍</span>

          <input
            type="text"
            placeholder="Search delicious food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* ❌ CLEAR BUTTON */}
          {search && (
            <span
              className="clear-icon"
              onClick={() => setSearch("")}
            >
              ✖
            </span>
          )}
        </div>
      </div>

      {/* 🍔 CATEGORY BUTTONS */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setSelectedCategory(cat)}
            style={{
              margin: "5px",
              background: selectedCategory === cat ? "orange" : "#333",
              color: "white",
              borderRadius: "20px",
              padding: "8px 15px"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🎬 STAGGER ANIMATION GRID */}
      <motion.div
        className="menu"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <motion.div
                key={food.name}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <FoodCard food={food} addToCart={addToCart} />
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: "center" }}
            >
              No items found 😢
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}