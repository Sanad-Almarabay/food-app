import { useNavigate } from "react-router-dom";

export default function Cart({ cart }) {
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Cart 🛒</h2>

      {cart.map((item, i) => (
        <p key={i}>{item.name} - {item.price} TL</p>
      ))}

      <h3>Total: {total} TL</h3>

      <button onClick={() => navigate("/checkout")}>Checkout</button>
    </div>
  );
}