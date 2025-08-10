import express from "express";
import FormEntry from "../models/FormEntry.js";

const router = express.Router();

// simple admin middleware (header-based)
const adminAuth = (req, res, next) => {
  const pwd = req.headers['x-admin-password'];
  if (!pwd || pwd !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect password' });
  }
  next();
};

// Save new form entry
router.post("/", async (req, res) => {
  try {
    const newEntry = new FormEntry(req.body);
    await newEntry.save();
    res.status(201).json({ message: "Form entry saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save form entry" });
  }
});

// Get all entries
router.get('/', adminAuth, async (req, res) => {
  try {
    const entries = await FormEntry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
});

// Delete entry by ID
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await FormEntry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete' });
  }
});

export default router;
