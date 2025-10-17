const express = require("express");
const router = express.Router();
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const Agent = require("../models/Agent");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const upload = multer({ dest: "uploads/" });

router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      try {
        const agents = await Agent.find();
        if (agents.length === 0) return res.status(400).json({ message: "No agents found" });

        let agentIndex = 0;
        for (let taskData of results) {
          const agent = agents[agentIndex % agents.length];
          const task = new Task({
            firstName: taskData.FirstName,
            phone: taskData.Phone,
            notes: taskData.Notes,
            agent: agent._id
          });
          await task.save();
          agentIndex++;
        }

        fs.unlinkSync(req.file.path); // Delete uploaded file
        res.json({ message: "Tasks distributed successfully" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
});

// Get tasks per agent
router.get("/agent/:id", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ agent: req.params.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
