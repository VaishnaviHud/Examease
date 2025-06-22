import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css"; 
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import AddExam from "./pages/AddExam";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import SubjectList from "./pages/subjectList";

import AdminLogin from "./pages/AdminLogin";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";
import AdminRegister from "./pages/AdminRegister";
import StudentRegister from "./pages/StudentRegister";
import TeacherRegister from "./pages/TeacherRegister";
import Navbar from "./components/Navbar";
import SeatingPage from "./pages/SeatingPage";
import RoomsList from "./pages/RoomList";
import ExamList from "./pages/ExamPage";
import GradeStudents from "./pages/GradeStudents";
import ViewGrades from "./pages/ViewGrades"; // Adjust path if different


const App = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />
        {/* Dashboard Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-exam" element={<AddExam />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/seating-arrangement" element={<SeatingPage />} />
        <Route path="/rooms" element={<RoomsList />} />
        <Route path="/subjects" element={<SubjectList />} />
        <Route path="/exampage" element={<ExamList />} />
        <Route path="/grade-students" element={<GradeStudents />} />
         <Route path="/view-grades" element={<ViewGrades />} />

        
        
      </Routes>
    </Router>
  );
};

export default App;
