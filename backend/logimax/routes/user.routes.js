const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/auth.middleware");

// Basic user routes - we can expand these later
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

router.get("/all", protect, admin, async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
