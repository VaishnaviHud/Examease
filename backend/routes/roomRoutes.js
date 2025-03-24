import express from "express";
import Room from "../models/Room.js";

const router = express.Router();


router.post("/add-room", async (req, res) => {
  try {
    const { room_no, capacity } = req.body;

   
    if (!room_no || !capacity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRoom = new Room({ room_no, capacity });
    await newRoom.save();
    res.status(201).json({ message: "Room added successfully", room: newRoom });
  } catch (error) {
    res.status(500).json({ message: "Error adding room", error: error.message });
  }
});


router.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find().populate("exams_scheduled");
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms", error: error.message });
  }
});

export default router;
