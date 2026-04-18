import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SidebarCart({
  cart,
  isOpen,
  closeCart,
  increaseQty,
  decreaseQty
}) {
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 🌑 OVERLAY */}
          <motion.div
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.6)",
              top: 0,
              left: 0,
              zIndex: 9
            }}
          />

          {/* 🛒 SIDEBAR */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120 }}
            style={{
              position: "fixed",
              right: 0,
              top: 0,
              width: "360px",
              height: "100%",
              background: "#0f0f0f",
              padding: "20px",
              zIndex: 10,
              boxShadow: "-5px 0 30px rgba(255,140,0,0.3)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>🛒 Your Cart</h2>

            {/* 📦 ITEMS */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              {cart.length === 0 ? (
                <p>No items yet 😢</p>
              ) : (
                cart.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: "flex",
                      gap: "10px",
                      background: "#1a1a1a",
                      padding: "10px",
                      borderRadius: "10px",
                      marginBottom: "12px",
                      alignItems: "center"
                    }}
                  >
                    {/* 🖼️ IMAGE */}
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "65px",
                        height: "65px",
                        objectFit: "cover",
                        borderRadius: "10px"
                      }}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/60x60?text=Food";
                      }}
                    />

                    {/* 📦 INFO */}
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0 }}>{item.name}</p>

                      <small style={{ color: "orange" }}>
                        {item.price} TL
                      </small>

                      {/* CONTROLS */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "6px"
                        }}
                      >
                        {/* ➕➖ */}
                        <div>
                          <button onClick={() => decreaseQty(item.name)}>
                            -
                          </button>

                          <span style={{ margin: "0 8px" }}>
                            {item.qty}
                          </span>

                          <button onClick={() => increaseQty(item.name)}>
                            +
                          </button>
                        </div>

                        {/* ❌ REMOVE */}
                        <span
                          onClick={() => decreaseQty(item.name)}
                          style={{
                            cursor: "pointer",
                            color: "red",
                            fontSize: "12px"
                          }}
                        >
                          Remove
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* 💰 TOTAL */}
            <div
              style={{
                borderTop: "1px solid #333",
                paddingTop: "15px"
              }}
            >
              <h3>Total: {total} TL</h3>

              <button
                onClick={() => {
                  closeCart();
                  navigate("/checkout");
                }}
                style={{
                  width: "100%",
                  marginTop: "10px"
                }}
              >
                Checkout 💳
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}