const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/api/orders", require("./routes/order"));
// routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

// DB connection
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");

    app.listen(process.env.PORT, () => {
      console.log("Server running 🚀");
    });

  } catch (err) {
    console.log("DB ERROR ❌", err);
  }
};

startServer();