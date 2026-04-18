import { useNavigate, Link } from "react-router-dom";

export default function Navbar({ openCart }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload(); // 🔥 refresh UI
  };

  return (
    <div className="navbar">
      <div className="logo">Foodie 🍔</div>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>

        <button onClick={openCart}>🛒</button>

        <span style={{ color: "orange" }}>{user?.email}</span>

        <button onClick={handleLogout}>Logout 🚪</button>
      </div>
    </div>
  );
}