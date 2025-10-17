const express = require("express");
const router = express.Router();
const Agent = require("../models/Agent");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/authMiddleware");

// Add Agent
router.post("/", authMiddleware, async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) return res.status(400).json({ message: "Agent already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const agent = new Agent({ name, email, mobile, password: hashedPassword });
    await agent.save();
    res.status(201).json(agent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all Agents
router.get("/", authMiddleware, async (req, res) => {
  try {
    const agents = await Agent.find().select("-password");
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
