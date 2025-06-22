import { useState, useEffect } from "react";
import axios from "axios";

const ViewGrades = () => {
  const [subjectId, setSubjectId] = useState("");
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:4000/api/subjects", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setSubjects(res.data))
      .catch(err => console.error("Failed to load subjects"));
  }, []);

  const fetchGrades = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/marks/grades/${subjectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGrades(res.data);
    } catch (error) {
      console.error("Failed to fetch grades", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">View Grading Results</h2>

      <div className="flex space-x-4 mb-6">
        <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} className="border p-2">
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s._id} value={s._id}>{s.subject_name}</option>
          ))}
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={fetchGrades}
        >
          Load Grades
        </button>
      </div>

      {grades.length > 0 && (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Student</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Grade</th>
              <th className="p-2 border">Avg %</th>
            </tr>
          </thead>
         <tbody>
  {grades.map((g) => (
    <tr key={`${g.student_id._id}-${g.grade}`} className="text-center border-b">
      <td className="p-2 border">{g.student_id.first_name} {g.student_id.last_name}</td>
      <td className="p-2 border">{g.student_id.email}</td>
      <td className="p-2 border">{g.grade}</td>
      <td className="p-2 border">{g.averageScore}</td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
};

export default ViewGrades;
