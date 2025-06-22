// import { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const GradeStudents = () => {
//   const [branch, setBranch] = useState("");
//   const [semester, setSemester] = useState("");
//   const [exams, setExams] = useState([]);
//   const [selectedExamId, setSelectedExamId] = useState("");
//   const [studentsWithGrades, setStudentsWithGrades] = useState([]);
//   const [formData, setFormData] = useState({});
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!branch || !semester) return;
//     const encodedBranch = encodeURIComponent(branch);

//     axios.get(`http://localhost:4000/api/exams/branch/${encodedBranch}/semester/${semester}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     }).then(res => setExams(res.data))
//       .catch(() => toast.error("Failed to load exams"));
//   }, [branch, semester]);

//   const fetchStudentsStatus = async () => {
//     try {
//       const res = await axios.get(`http://localhost:4000/api/marks/students-status?branch=${branch}&semester=${semester}&exam_id=${selectedExamId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStudentsWithGrades(res.data);
//     } catch (error) {
//       toast.error("Failed to fetch students status");
//     }
//   };

//   const handleMarksChange = (studentId, field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [studentId]: {
//         ...prev[studentId],
//         [field]: value,
//       },
//     }));
//   };

//   const handleSubmit = async (studentId) => {
//     const exam = exams.find(e => e._id === selectedExamId);
//     const payload = {
//       student_id: studentId,
//       exam_id: selectedExamId,
//       subject_id: exam.subject_id._id,
//       marks_obtained: formData[studentId]?.marks_obtained,
//       total_marks: formData[studentId]?.total_marks,
//     };

//     try {
//       await axios.post("http://localhost:4000/api/marks/add", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Marks submitted!");
//       fetchStudentsStatus(); // Refresh the list
//     } catch (err) {
//       toast.error("Failed to submit marks");
//     }
//   };

//   return (
//     <div className="p-6">
//       <ToastContainer />
//       <h2 className="text-2xl font-bold mb-4">Grade Students</h2>

//       <div className="grid grid-cols-3 gap-4 mb-6">
//         <select value={branch} onChange={(e) => setBranch(e.target.value)} className="border p-2">
//           <option value="">Select Branch</option>
//           <option value="Computer Engineering">Computer Engineering</option>
//           <option value="Information Technology">Information Technology</option>
//           <option value="Mechanical Engineering">Mechanical Engineering</option>
//           <option value="EXTC">EXTC</option>
//           <option value="Electronics">Electronics</option>
//         </select>

//         <select value={semester} onChange={(e) => setSemester(e.target.value)} className="border p-2">
//           <option value="">Select Semester</option>
//           {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}</option>)}
//         </select>

//         <select value={selectedExamId} onChange={(e) => setSelectedExamId(e.target.value)} className="border p-2">
//           <option value="">Select Exam</option>
//           {exams.map((exam) => (
//             <option key={exam._id} value={exam._id}>
//               {exam.exam_type} - {exam.subject_id.subject_name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <button
//         className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
//         onClick={fetchStudentsStatus}
//         disabled={!branch || !semester || !selectedExamId}
//       >
//         Load Students
//       </button>

//       {studentsWithGrades.length > 0 && (
//         <div className="space-y-4">
//           {studentsWithGrades.map((student) => (
//             <div key={student._id} className="p-4 border rounded shadow">
//               <p className="font-semibold">{student.name || student.email}</p>
//               {student.graded ? (
//                 <p className="text-green-600">Already graded ✅</p>
//               ) : (
//                 <div className="grid grid-cols-2 gap-4 mt-2">
//                   <input
//                     type="number"
//                     placeholder="Marks Obtained"
//                     value={formData[student._id]?.marks_obtained || ""}
//                     onChange={(e) =>
//                       handleMarksChange(student._id, "marks_obtained", e.target.value)
//                     }
//                     className="border p-2"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Total Marks"
//                     value={formData[student._id]?.total_marks || ""}
//                     onChange={(e) =>
//                       handleMarksChange(student._id, "total_marks", e.target.value)
//                     }
//                     className="border p-2"
//                   />
//                   <button
//                     onClick={() => handleSubmit(student._id)}
//                     className="col-span-2 bg-green-500 text-white p-2 rounded"
//                   >
//                     Submit Marks
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default GradeStudents;


import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GradeStudents = () => {
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState("");
  const [studentsWithGrades, setStudentsWithGrades] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!branch || !semester) return;
    const encodedBranch = encodeURIComponent(branch);

    axios
      .get(`http://localhost:4000/api/exams/branch/${encodedBranch}/semester/${semester}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setExams(res.data))
      .catch(() => toast.error("Failed to load exams"));
  }, [branch, semester]);

  const fetchStudentsStatus = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/marks/students-status?branch=${branch}&semester=${semester}&exam_id=${selectedExamId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStudentsWithGrades(res.data);
    } catch (error) {
      toast.error("Failed to fetch students status");
    }
  };

  const handleMarksChange = (studentId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (studentId) => {
    const exam = exams.find((e) => e._id === selectedExamId);
    const payload = {
      student_id: studentId,
      exam_id: selectedExamId,
      subject_id: exam.subject_id._id,
      marks_obtained: formData[studentId]?.marks_obtained,
      total_marks: formData[studentId]?.total_marks,
    };

    try {
      await axios.post("http://localhost:4000/api/marks/add", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Marks submitted!");
      fetchStudentsStatus();
    } catch (err) {
      toast.error("Failed to submit marks");
    }
  };

  const handleAutoGrade = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/marks/auto-grade?subject_id=${selectedSubjectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.table(res.data.results);
      toast.success("Grading complete! Check console.");
    } catch (error) {
      toast.error("Auto-grading failed.");
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Grade Students</h2>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <select value={branch} onChange={(e) => setBranch(e.target.value)} className="border p-2">
          <option value="">Select Branch</option>
          <option value="Computer Engineering">Computer Engineering</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="EXTC">EXTC</option>
          <option value="Electronics">Electronics</option>
        </select>

        <select value={semester} onChange={(e) => setSemester(e.target.value)} className="border p-2">
          <option value="">Select Semester</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select value={selectedExamId} onChange={(e) => setSelectedExamId(e.target.value)} className="border p-2">
          <option value="">Select Exam</option>
          {exams.map((exam) => (
            <option key={exam._id} value={exam._id}>
              {exam.exam_type} - {exam.subject_id.subject_name}
            </option>
          ))}
        </select>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
        onClick={fetchStudentsStatus}
        disabled={!branch || !semester || !selectedExamId}
      >
        Load Students
      </button>

      {/* Student List */}
      {studentsWithGrades.length > 0 && (
        <div className="space-y-4">
          {studentsWithGrades.map((student) => (
            <div key={student._id} className="p-4 border rounded shadow">
              <p className="font-semibold">{student.name || student.email}</p>
              {student.graded ? (
                <p className="text-green-600">Already graded ✅</p>
              ) : (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <input
                    type="number"
                    placeholder="Marks Obtained"
                    value={formData[student._id]?.marks_obtained || ""}
                    onChange={(e) =>
                      handleMarksChange(student._id, "marks_obtained", e.target.value)
                    }
                    className="border p-2"
                  />
                  <input
                    type="number"
                    placeholder="Total Marks"
                    value={formData[student._id]?.total_marks || ""}
                    onChange={(e) =>
                      handleMarksChange(student._id, "total_marks", e.target.value)
                    }
                    className="border p-2"
                  />
                  <button
                    onClick={() => handleSubmit(student._id)}
                    className="col-span-2 bg-green-500 text-white p-2 rounded"
                  >
                    Submit Marks
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Auto Grade Section */}
      <div className="mt-8 p-4 border rounded bg-gray-100">
        <h3 className="text-xl font-semibold mb-2">Auto Grade using Bell Curve</h3>
        <select
          onChange={(e) => setSelectedSubjectId(e.target.value)}
          className="border p-2 mr-4"
          value={selectedSubjectId}
        >
          <option value="">Select Subject</option>
          {[...new Set(exams.map((e) => e.subject_id._id))].map((id) => {
            const subject = exams.find((e) => e.subject_id._id === id)?.subject_id;
            return (
              <option key={id} value={id}>
                {subject.subject_name}
              </option>
            );
          })}
        </select>
        <button
          onClick={handleAutoGrade}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Auto Grade
        </button>
      </div>
    </div>
  );
};

export default GradeStudents;
