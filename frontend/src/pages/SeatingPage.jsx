import React, { useState, useEffect } from "react";
import axios from "axios";

const SeatingPage = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [numRooms, setNumRooms] = useState("");
  const [seatsPerRoom, setSeatsPerRoom] = useState("");
  const [numStudents, setNumStudents] = useState("");
  const [seatingData, setSeatingData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch available exams
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/exams") // Replace with your backend API
      .then((response) => setExams(response.data))
      .catch((error) => console.error("Error fetching exams:", error));
  }, []);

  // Handle seating allocation
  const generateSeating = async () => {
    if (!selectedExam || !numRooms || !seatsPerRoom || !numStudents) {
      alert("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/seating/allocate", {
        exam_id: selectedExam,
        rooms: Number(numRooms),
        seats_per_room: Number(seatsPerRoom),
        total_students: Number(numStudents),
      });

      setSeatingData(response.data.seatAllocations);
    } catch (error) {
      console.error("Error generating seating:", error);
      alert("Failed to generate seating");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Automatic Seating Arrangement</h1>

        {/* Exam Selection */}
        <select
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          onChange={(e) => setSelectedExam(e.target.value)}
        >
          <option value="">Select an Exam</option>
          {exams.map((exam) => (
            <option key={exam._id} value={exam._id}>
              {exam.name}
            </option>
          ))}
        </select>

        {/* Input Fields */}
        <input
          type="number"
          placeholder="Number of Rooms"
          value={numRooms}
          onChange={(e) => setNumRooms(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />
        <input
          type="number"
          placeholder="Seats per Room"
          value={seatsPerRoom}
          onChange={(e) => setSeatsPerRoom(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />
        <input
          type="number"
          placeholder="Number of Students"
          value={numStudents}
          onChange={(e) => setNumStudents(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />

        {/* Generate Seating Button */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
          onClick={generateSeating}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Seating"}
        </button>

        {/* Display Seating Arrangement */}
        {seatingData && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Seating Arrangement</h2>
            {seatingData.map((room, index) => (
              <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50">
                <h3 className="text-lg font-bold text-gray-700 mb-2">Room: {room.room_id}</h3>
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border p-2">Seat No</th>
                      <th className="border p-2">Student ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {room.allocations.map((seat, idx) => (
                      <tr key={idx} className="text-center">
                        <td className="border p-2">{seat.seat_no}</td>
                        <td className="border p-2">{seat.student_id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatingPage;
