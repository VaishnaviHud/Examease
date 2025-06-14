import Exam from "../models/Exam.js";
import Room from "../models/Room.js"
import Seating from "../models/SeatingArrangement.js"
import Student from "../models/Student.js"


// export const generateSeatingArrangement = async (req, res) => {
//   try {
//     const { exam_id } = req.body;

//     // Step 1: Find Exam
//     const exam = await Exam.findById(exam_id).populate("students_registered");
//     if (!exam) return res.status(404).json({ message: "Exam not found" });

//     // Step 1.5: Check if seating already exists
//     const existingArrangement = await Seating.findOne({ exam_id });
//     if (existingArrangement) {
//       return res.status(400).json({ message: "Seating arrangement already exists for this exam." });
//     }

//     const students = exam.students_registered;
//     const totalStudents = students.length;

//     // Step 2: Get all available rooms sorted by capacity
//     const rooms = await Room.find({}).sort({ capacity: -1 });
//     if (rooms.length === 0) return res.status(400).json({ message: "No rooms available" });

//     let studentIndex = 0;
//     const arrangements = [];

//     for (const room of rooms) {
//       if (studentIndex >= totalStudents) break;

//       const seatAllocations = [];
//       const roomCapacity = room.capacity;

//       for (let i = 0; i < roomCapacity && studentIndex < totalStudents; i++, studentIndex++) {
//         seatAllocations.push({
//           student_id: students[studentIndex]._id,
//           seat_no: `S${i + 1}`,
//         });
//       }

//       const seating = new Seating({
//         exam_id: exam._id,
//         room_id: room._id,
//         seat_allocations: seatAllocations,
//       });
//       await seating.save();
//       arrangements.push(seating);
//     }

//     if (studentIndex < totalStudents) {
//       return res.status(400).json({
//         message: `Only ${studentIndex} out of ${totalStudents} students were accommodated. Not enough rooms.`,
//       });
//     }

//     res.status(200).json({
//       message: "Seating arrangement generated successfully",
//       arrangements,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
export const generateSeatingArrangement = async (req, res) => {
  try {
    const { exam_id } = req.body;

    
    const exam = await Exam.findById(exam_id).populate("students_registered");
    if (!exam) return res.status(404).json({ message: "Exam not found" });

  
    const existingArrangement = await Seating.findOne({ exam_id });
    if (existingArrangement) {
      return res.status(400).json({ message: "Seating arrangement already exists for this exam." });
    }

    const students = exam.students_registered;
    const totalStudents = students.length;

   
    const rooms = await Room.find({}).sort({ capacity: -1 });
    if (rooms.length === 0) return res.status(400).json({ message: "No rooms available" });

    let studentIndex = 0;
    const arrangements = [];

    for (const room of rooms) {
      if (studentIndex >= totalStudents) break;

    
      const isRoomOccupied = room.exams_scheduled.includes(exam_id);
      if (isRoomOccupied) continue; 

      const seatAllocations = [];
      const roomCapacity = room.capacity;

      for (let i = 0; i < roomCapacity && studentIndex < totalStudents; i++, studentIndex++) {
        seatAllocations.push({
          student_id: students[studentIndex]._id,
          seat_no: `S${i + 1}`,
        });
      }

  
      const seating = new Seating({
        exam_id: exam._id,
        room_id: room._id,
        seat_allocations: seatAllocations,
      });

      await seating.save();
      arrangements.push(seating);

    
      room.exams_scheduled.push(exam._id);
      await room.save();
    }


    if (studentIndex < totalStudents) {
      return res.status(400).json({
        message: `Only ${studentIndex} out of ${totalStudents} students were accommodated. Not enough available rooms.`,
      });
    }

    res.status(200).json({
      message: "Seating arrangement generated successfully",
      arrangements,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllSeatingArrangements = async (req, res) => {
  try {
   const seatings = await Seating.find()
  .populate({
    path: "exam_id",
    populate: {
      path: "subject_id",
      model: "Subject",
    },
  })
  .populate("room_id")
  .populate("seat_allocations.student_id");


    res.status(200).json(seatings);
  } catch (error) {
    console.error("Error fetching all seating arrangements:", error);
    res.status(500).json({ message: "Server error" });
  }
};

