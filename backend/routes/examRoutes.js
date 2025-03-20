import express from "express";
import Exam from "../models/Exam.js";
import Student from "../models/Student.js";
import { verifyAdmin } from "../middleware/auth.js"; // Ensure admin authentication

const router = express.Router();

// Admin adds an exam for a specific semester
router.post("/add", verifyAdmin, async (req, res) => {
  try {
    const { exam_id, subject_id, semester, exam_date, duration, exam_type, supervisors } = req.body;

    // Fetch all students in the given semester
    const students = await Student.find({ semester }).select("_id");

    if (!students.length) {
      return res.status(400).json({ message: "No students found in this semester." });
    }

    const newExam = new Exam({
      exam_id,
      subject_id,
      semester,
      exam_date,
      duration,
      exam_type,
      students_registered: students.map((s) => s._id), // Auto-register students
      supervisors,
    });

    await newExam.save();
    res.status(201).json({ message: "Exam added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding exam", error });
  }
});

export default router;
