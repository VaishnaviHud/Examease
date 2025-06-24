import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [role, setRole] = useState(user?.role || null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(() => {
      navigate("/");
      
    });
  };


  useEffect(() => {
    setRole(user?.role);
  }, [user]);

  return (
    <motion.nav
      className="p-4 shadow-md flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <h1 className="text-3xl font-extrabold tracking-wide">
        {" "}
        <Link to="/" className="hover:text-gray-300 transition">
          ExamEase
        </Link>
      </h1>

      {/* Links */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/" className="hover:text-gray-300 transition">
          Home
        </Link>
        <Link to="/about" className="hover:text-gray-300 transition">
          About
        </Link>

        {/* Admin Links */}
        {role === "admin" && (
          <>
            <Link
              to="/admin-dashboard"
              className="hover:text-gray-300 transition"
            >
              Dashboard
            </Link>
            <Link to="/manage-users" className="hover:text-gray-300 transition">
              Manage Users
            </Link>
          </>
        )}

        {/* Teacher Links */}
        {role === "teacher" && (
          <>
            <Link
              to="/teacher-dashboard"
              className="hover:text-gray-300 transition"
            >
              My Courses
            </Link>
            <Link
              to="/grade-students"
              className="hover:text-gray-300 transition"
            >
              Grade Students
            </Link>
            <Link
              to="/create-assignment"
              className="hover:text-gray-300 transition"
            >
              Create Assignments
            </Link>
          </>
        )}

        {/* Student Links */}
        {role === "student" && (
          <>
            <Link
              to="/student-dashboard"
              className="hover:text-gray-300 transition"
            >
              My Courses
            </Link>
            <Link to="/student/subjects" className="hover:text-gray-300 transition">
              Assignments
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
