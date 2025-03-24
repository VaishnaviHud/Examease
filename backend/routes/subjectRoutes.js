import express from "express";
import Subject from "../models/Subject.js";
import Teacher from "../models/Teacher.js";

const router = express.Router();

// Add a new subject
router.post("/add", async (req, res) => {
  try {
    const { subject_id, subject_name, branch, semester, faculty_id } = req.body;

    const newSubject = new Subject({ subject_id, subject_name, branch, semester, faculty_id });
    await newSubject.save();

    res.status(201).json({ message: "Subject added successfully!", subject: newSubject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all subjects
router.get("/list", async (req, res) => {
  try {
    const subjects = await Subject.find().populate("faculty_id", "first_name last_name email");
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get list of teachers
router.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find({}, "first_name last_name email");
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
