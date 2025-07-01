import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewGrades = () => {
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [grades, setGrades] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch subjects when branch and semester are selected
  useEffect(() => {
    if (!branch || !semester) return;

    axios
      .get("http://localhost:4000/api/subjects", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const filtered = res.data.filter(
          (s) => s.branch === branch && s.semester === parseInt(semester)
        );
        setSubjects(filtered);
        setSubjectId(""); // Reset subject selection
        console.log("Filtered subjects:", filtered);
      })
      .catch((err) => {
        console.error("Failed to load subjects", err);
        toast.error("Failed to load subjects");
      });
  }, [branch, semester]);

  const fetchGrades = async () => {
    if (!subjectId) return toast.warn("Please select a subject");
    try {
      const res = await axios.get(
        `http://localhost:4000/api/marks/grades/${subjectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setGrades(res.data);
    } catch (error) {
      console.error("Failed to fetch grades", error);
      toast.error("Failed to fetch grades");
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">View Grading Results</h2>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Branch */}
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="border p-2"
        >
          <option value="">Select Branch</option>
          <option value="Computer Engineering">Computer Engineering</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="EXTC">EXTC</option>
          <option value="Electronics">Electronics</option>
        </select>

        {/* Semester */}
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="border p-2"
        >
          <option value="">Select Semester</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Subject */}
        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="border p-2"
          disabled={subjects.length === 0}
        >
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s._id} value={s._id}>
              {s.subject_name}
            </option>
          ))}
        </select>
      </div>

      {/* Load Grades Button */}
      <button
        onClick={fetchGrades}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={!subjectId}
      >
        Load Grades
      </button>

      {/* Grades Table */}
      {grades.length > 0 ? (
        <table className="table-auto w-full border-collapse mt-6">
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
              <tr key={g.student_id._id} className="text-center border-b">
                <td className="p-2 border">
                  {g.student_id.first_name} {g.student_id.last_name}
                </td>
                <td className="p-2 border">{g.student_id.email}</td>
                <td className="p-2 border">{g.grade}</td>
                <td className="p-2 border">{g.averageScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 mt-4">No grades to display.</p>
      )}
    </div>
  );
};

export default ViewGrades;
