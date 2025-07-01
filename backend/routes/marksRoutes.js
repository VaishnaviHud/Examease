import express from "express";
// import { addMarks, getStudentsWithGrades } from "../controllers/marks.controller.js";
import { addMarks, getStudentsWithGrades, autoGradeStudents,getGradesBySubject  } from "../controllers/marks.controller.js";
import { verifyFaculty } from "../middlewares/authMiddleware.js";
import { updateMarks, deleteMarks } from "../controllers/marks.controller.js";


// routes/marksRoutes.js
console.log("✅ marksRoutes loaded");

// import express from "express";










// import express from "express";
// import { addMarks } from "../controllers/marks.controller.js";
// import { verifyFaculty } from "../middlewares/authMiddleware.js";

const router = express.Router();
// router.get("/test", (req, res) => {
//   res.send("✅ /api/marks/test working");
// });


// // POST route to add marks
router.post("/add", verifyFaculty, addMarks);
// // //router.post("/add", verifyFaculty, addMarks);
// // router.post("/add", addMarks); // 🔍 Test if middleware is blocking




router.get("/students-status", verifyFaculty, getStudentsWithGrades);




router.get("/auto-grade", verifyFaculty, autoGradeStudents); 
// router.get("/auto-grade", verifyFaculty, autoGradeStudents);
router.get("/grades/:subject_id", verifyFaculty, getGradesBySubject);
router.put("/:mark_id", verifyFaculty, updateMarks);
router.delete("/:mark_id", verifyFaculty, deleteMarks);


export default router;
// routes/marksRoutes.js
