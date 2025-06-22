import express from "express";
import Student from "../models/Student.js";
//import authMiddleware from "../middleware/authMiddleware.js"; // Ensure this exists
import authMiddleware from "../middlewares/authMiddleware.js"

import roleMiddleware from "../middlewares/roleMiddleware.js"; // Updated Middleware
import Exam from "../models/Exam.js";
const router = express.Router();
import {
  registerStudent,
  loginStudent,
  verifyStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  getUnverifiedStudents,
  getStudentsByBranchAndSemester, // ✅ NEW
} from "../controllers/student.controller.js";

router.get('/filter', authMiddleware, getStudentsByBranchAndSemester);


// GET all students (only authentication required, no role check)
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const students = await Student.find({}, "-password"); // Exclude password
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Failed to fetch students", error });
  }
});
router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/:id", authMiddleware, getStudent);
router.put("/:id", authMiddleware, updateStudent);
router.delete("/:id", authMiddleware, deleteStudent);
router.put(
  "/verify/:studentId",
  authMiddleware,
  roleMiddleware("admin"), // Only Admins Can Verify
  verifyStudent
);
router.get("/exams", verifyStudent, async (req, res) => {
  try {
    const student = req.user; // Get student from token
    const exams = await Exam.find({ semester: student.semester }).populate("subject_id");

    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exams", error });
  }
});

router.get("/", authMiddleware, roleMiddleware("admin"), getUnverifiedStudents);


export default router;
