import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/students/exams", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
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
            <li key={exam.exam_id} className="border p-4 my-2 rounded-lg">
              <h3 className="font-semibold">{exam.subject_id.name}</h3>
              <p>Date: {new Date(exam.exam_date).toLocaleDateString()}</p>
              <p>Duration: {exam.duration}</p>
              <p>Type: {exam.exam_type}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentDashboard;
