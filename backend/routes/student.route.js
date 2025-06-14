import express from "express";
import Student from "../models/Student.js";
//import authMiddleware from "../middleware/authMiddleware.js"; // Ensure this exists
import authMiddleware from "../middlewares/authMiddleware.js"
const router = express.Router();

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

export default router;
