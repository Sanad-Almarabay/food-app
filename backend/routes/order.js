const router = require("express").Router();
const Order = require("../models/Order");

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const { userId, items, total } = req.body;

    const order = await Order.create({
      userId,
      items,
      total
    });

    res.json({ message: "Order saved ✅", order });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET USER ORDERS
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });

    res.json(orders);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;