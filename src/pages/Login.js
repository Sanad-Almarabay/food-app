import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../App.css";
 import axios from "axios";
export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");



const handleLogin = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5001/api/auth/login",
      { email, password }
    );

    console.log(res.data);

    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/");
    window.location.reload();

  } catch (err) {
    setError(err.response?.data?.message || "Login failed ❌");
  }
};
  return (
    <div className="auth-bg">
      <motion.div
        className="auth-glass clean-card fancy-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="clean-title gradient-title">Welcome Back</h1>

        <div className="input-group">
          <span>📧</span>
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <span>🔒</span>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* 🔴 ERROR MESSAGE */}
        {error && <p className="error-msg">{error}</p>}

        <button className="clean-btn fancy-btn" onClick={handleLogin}>
          Login
        </button>

        <p onClick={() => navigate("/signup")}>
          Create account →
        </p>
      </motion.div>
    </div>
  );
}