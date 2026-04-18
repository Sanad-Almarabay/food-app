import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="hero">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Premium Food Experience 🍕</h1>
        <p>Order your favorite meals fast & easy</p>
      </motion.div>
    </div>
  );
}