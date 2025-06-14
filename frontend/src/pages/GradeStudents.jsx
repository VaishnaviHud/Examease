import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GradeStudents = () => {
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [formData, setFormData] = useState({
    student_id: "",
    exam_id: "",
    subject_id: "",
    marks_obtained: "",
    total_marks: "",
  });

  useEffect(() => {
  const token = localStorage.getItem("token");
  const fetchData = async () => {
    try {
      const studentRes = await axios.get("http://localhost:4000/api/students/all", {
  headers: { Authorization: `Bearer ${token}` },
});



      const examRes = await axios.get("http://localhost:4000/api/exams/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStudents(studentRes.data);
      setExams(examRes.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  

  };
  fetchData();
}, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // When exam changes, set subject_id automatically
  const handleExamChange = (e) => {
    const examId = e.target.value;
    const selectedExam = exams.find((exam) => exam._id === examId);
    setFormData((prev) => ({
      ...prev,
      exam_id: examId,
      subject_id: selectedExam?.subject_id?._id || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/marks/add", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Marks submitted successfully!");
      setFormData({
        student_id: "",
        exam_id: "",
        subject_id: "",
        marks_obtained: "",
        total_marks: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting marks.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Grade Students</h2>
        <form onSubmit={handleSubmit}>
          {/* Student Dropdown */}
          <div className="mb-4">
            <select name="student_id" value={formData.student_id} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-lg">
              <option value="">Select Student</option>
              {students.map((s) => (
  <option key={s._id} value={s._id}>
    {s.first_name && s.last_name ? `${s.first_name} ${s.last_name}` : s.email}
  </option>
))}

            </select>
          </div>

          {/* Exam Dropdown */}
          <div className="mb-4">
            <select name="exam_id" value={formData.exam_id} onChange={handleExamChange} required className="w-full p-2 border border-gray-300 rounded-lg">
              <option value="">Select Exam</option>
              {exams.map((exam) => (
                <option key={exam._id} value={exam._id}>
                  {exam.exam_type} - {exam.subject_id?.name} ({exam.exam_date})
                </option>
              ))}
            </select>
          </div>

          {/* Marks Obtained */}
          <div className="mb-4">
            <input
              type="number"
              name="marks_obtained"
              placeholder="Marks Obtained"
              value={formData.marks_obtained}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Total Marks */}
          <div className="mb-4">
            <input
              type="number"
              name="total_marks"
              placeholder="Total Marks"
              value={formData.total_marks}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-700">
            Submit Marks
          </button>
        </form>
      </div>
    </div>
  );
};

export default GradeStudents;
