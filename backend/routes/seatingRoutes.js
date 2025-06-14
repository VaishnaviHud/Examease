import express from "express";
import { generateSeatingArrangement , getAllSeatingArrangements } from "../controllers/seating.controller.js";

const router = express.Router();
router.post("/generate-seating", generateSeatingArrangement);

router.get("/all", getAllSeatingArrangements);
export default router;
