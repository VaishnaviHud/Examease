import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        console.log("Sending request with:", user);

        const { data } = await axios.get("http://localhost:4000/api/exams", {
          params: {
            branch: user.branch,
            semester: user.semester,
          },
        });
        
        console.log("Exams received:", data);

        setExams(data);
      } catch (error) {
        console.error("Error fetching exams", error);
      }
    };

    if (user) fetchExams();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Upcoming Exams</h2>
      {exams.length === 0 ? (
        <p>No exams scheduled.</p>
      ) : (
        <ul>
          {exams.map((exam) => (
            <li key={exam._id} className="border p-4 my-2 rounded-lg">
              <h3 className="font-semibold">
                {exam.subject_id?.subject_name || "Unknown Subject"}
              </h3>
              <p>
                Date:{" "}
                {exam.exam_date
                  ? new Date(exam.exam_date).toLocaleDateString()
                  : "Invalid Date"}
              </p>
              <p>Duration: {exam.duration || "N/A"} minutes</p>
              <p>Type: {exam.exam_type || "N/A"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentDashboard;
