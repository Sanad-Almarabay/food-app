import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <motion.div
        className="success-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>🎉 Order Successful!</h1>
        <p>Your food is on the way 🚀</p>

        <button onClick={() => navigate("/")}>
          Back to Home 🏠
        </button>
      </motion.div>
    </div>
  );
}