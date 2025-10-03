const express = require("express");
const cors = require("cors");

const dishRoutes = require("./routes/dishRoutes");
const authRoutes = require("../src/auth/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/dishes", dishRoutes);

module.exports = app;
