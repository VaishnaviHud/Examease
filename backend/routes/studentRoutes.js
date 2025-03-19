import express from "express";
import {
  registerStudent,
  loginStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  verifyStudent,
  getUnverifiedStudents,
} from "../controllers/student.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js"; // Updated Middleware

const router = express.Router();

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

router.get("/", authMiddleware, roleMiddleware("admin"), getUnverifiedStudents);

export default router;
