import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [studentsRes, teachersRes] = await Promise.all([
          axios.get("http://localhost:4000/api/students", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:4000/api/teachers", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setStudents(studentsRes.data);
        setTeachers(teachersRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
        toast.error("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const verifyUser = async (id, type) => {
    setVerifying(id);
    try {
      await axios.put(
        `http://localhost:4000/api/${type}/verify/${id}`, // ✅ Ensure the correct endpoint
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(
        `${type === "students" ? "Student" : "Teacher"} verified successfully!`
      );

      if (type === "students") {
        setStudents((prev) => prev.filter((s) => s._id !== id));
      } else {
        setTeachers((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (error) {
      console.error("Verification failed", error);
      toast.error("Verification failed. Try again.");
    } finally {
      setVerifying(null);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <ToastContainer position="top-right" autoClose={2000} />

      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Admin Dashboard
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Add New Exam Button (Correct Placement) */}
          <div className="mb-6 text-center">
            <Link
              to="/admin/add-exam"
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700"
            >
              ➕ Add New Exam
            </Link>
          </div>

          {/* Students Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Pending Students
            </h2>
            {students.length === 0 ? (
              <p className="text-gray-500 text-center">No pending students.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {students.map((student) => (
                  <div
                    key={student._id}
                    className="p-4 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      {student.first_name} {student.last_name}
                    </h3>
                    <p className="text-gray-600">Email: {student.email}</p>
                    <button
                      onClick={() => verifyUser(student._id, "students")}
                      className={`mt-3 px-4 py-2 text-white rounded-lg w-full transition duration-300 ${
                        verifying === student._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-700"
                      }`}
                      disabled={verifying === student._id}
                    >
                      {verifying === student._id ? "Verifying..." : "Verify"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Teachers Section */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Pending Teachers
            </h2>
            {teachers.length === 0 ? (
              <p className="text-gray-500 text-center">No pending teachers.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teachers.map((teacher) => (
                  <div
                    key={teacher._id}
                    className="p-4 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      {teacher.first_name} {teacher.last_name}
                    </h3>
                    <p className="text-gray-600">Email: {teacher.email}</p>
                    <button
                      onClick={() => verifyUser(teacher._id, "teachers")}
                      className={`mt-3 px-4 py-2 text-white rounded-lg w-full transition duration-300 ${
                        verifying === teacher._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-700"
                      }`}
                      disabled={verifying === teacher._id}
                    >
                      {verifying === teacher._id ? "Verifying..." : "Verify"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
