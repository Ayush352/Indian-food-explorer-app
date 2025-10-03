const express = require("express");
const router = express.Router();
const { getAllDishes, getDishById, suggestDishes } = require("../controllers/dishController");

// Routes
router.get("/", getAllDishes);
router.get("/:id", getDishById);
router.post("/suggest", suggestDishes);

module.exports = router;
