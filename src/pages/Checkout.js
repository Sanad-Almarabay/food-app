import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

export default function Checkout({ cart, setCart }) {
  const navigate = useNavigate();

  // 💰 calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // 🚀 HANDLE ORDER
  const handleOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      console.log("USER:", user);
      console.log("CART:", cart);
      console.log("TOTAL:", total);

      // ❌ check login
      if (!user || !user._id) {
        alert("User not logged in properly ❌");
        return;
      }

      // ❌ check cart
      if (cart.length === 0) {
        alert("Cart is empty ❌");
        return;
      }

      const res = await axios.post(
        "http://localhost:5001/api/orders",
        {
          userId: user._id,
          items: cart,
          total
        }
      );

      console.log("ORDER RESPONSE:", res.data);
console.log(typeof setCart);
      // 🧹 clear cart
      setCart([]);
      localStorage.removeItem("cart");

      // 🚀 go to success page
      navigate("/success");

    } catch (err) {
      console.log("FULL ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Order failed ❌");
    }
  };

  return (
    <div className="checkout">
      <h1>Checkout 🧾</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        <>
          <div className="checkout-items">
            {cart.map((item, i) => (
              <div className="checkout-item" key={i}>
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    {item.qty} × {item.price} ={" "}
                    <strong>{item.qty * item.price}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="total">Total: {total}</h2>

          <button className="order-btn" onClick={handleOrder}>
            Place Order 🚀
          </button>
        </>
      )}
    </div>
  );
}