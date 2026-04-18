import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../App.css";
 import axios from "axios";
export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const strength =
    (form.password.length >= 6) +
    /[A-Z]/.test(form.password) +
    /[0-9]/.test(form.password);

  const handleSignup = async () => {
  try {
    await axios.post(
      "http://localhost:5001/api/auth/register",
      form
    );

    navigate("/login");

  } catch (err) {
    alert(err.response?.data?.message || "Signup failed ❌");
  }
};

  return (
    <div className="auth-bg">
      <motion.div
        className="auth-glass clean-card fancy-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="clean-title gradient-title">Create Account</h1>

        <div className="input-group">
          <span>👤</span>
          <input name="name" placeholder="Full Name" onChange={handleChange} />
        </div>

        <div className="input-group">
          <span>📞</span>
          <input name="phone" placeholder="Phone" onChange={handleChange} />
        </div>

        <div className="input-group">
          <span>📧</span>
          <input name="email" placeholder="Email" onChange={handleChange} />
        </div>

        <div className="input-group">
          <span>🔒</span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <span onClick={() => setShowPassword(!showPassword)}>👁</span>
        </div>

        {/* strength */}
        <div className="strength-bar">
          <div className={`strength strength-${strength}`}></div>
        </div>

        <div className="input-group">
          <span>🔐</span>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
        </div>

        <button className="clean-btn fancy-btn" onClick={handleSignup}>
          Sign Up
        </button>

        <p onClick={() => navigate("/login")}>
          Already have account →
        </p>
      </motion.div>
    </div>
  );
}