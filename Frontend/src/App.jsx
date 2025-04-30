// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import ForgotPassword from "./pages/ForgetPassword";
import ManageUserRoles from "./components/admin/ManageUserRoles";
import ConductClasses from "./components/teacher/ConductClasses";
import ManageCourses from "./components/teacher/ManageCources";
import GradeStudents from "./components/teacher/GradeStudent";
import AccessCourseMaterials from "./components/student/AccessCourseMaterial";
import TrackAttendance from "./components/student/TrackAttendence";
import ViewGrades from "./components/student/ViewGrades";
import MonitorProgress from "./components/parent/MonitorProgress";
import PayFees from "./components/parent/Payfees";
import AdminDash from "./components/admin/AdminDash";
import ManageSystem from "./components/admin/ManageSystem";
import TeacherDash from "./components/teacher/TeacherDash";
import StudentDash from "./components/student/StudentDash";
import ParentDash from "./components/parent/ParentDash";
import ViewStudent from "./components/admin/ViewStudent";
import DeleteStudent from "./components/admin/DeleteStudent";
import UpdateStudent from "./components/admin/UpdateStudent";
import SearchStudent from "./components/admin/SearchStudent";
import Logout from "./components/admin/Logout";
import AddStudent from "./components/admin/AddStudent";
import ViewTeacher from "./components/admin/ViewTeacher";
import AddTeacher from "./components/admin/AddTeacher";
import SearchTeacher from "./components/admin/SearchTeacher";
import UpdateTeacher from "./components/admin/UpdateTeacher";
import DeleteTeacher from "./components/admin/DeleteTeacher";

function App() {
  return (
    <Router>
      <Routes>
       {/* login routing */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />


        {/* admin routing */}
        <Route path="/admin" element={<AdminDash />} />
        <Route path="/admin/system" element={<ManageSystem/>}/>
        <Route path="/admin/roles" element={<ManageUserRoles />} />
        <Route path="/admin/add-student" element={<AddStudent />} />
        <Route path="/admin/view-student" element={<ViewStudent />} />
        <Route path="/admin/delete-student" element={<DeleteStudent />} />
        <Route path="/admin/update-student" element={<UpdateStudent />} />
        <Route path="/admin/search-student" element={<SearchStudent />} />
        <Route path="/admin/view-teacher" element={<ViewTeacher />} />
        <Route path="/admin/add-teacher" element={<AddTeacher />} />
        <Route path="/admin/search-teacher" element={<SearchTeacher />} />
        <Route path="/admin/update-teacher" element={<UpdateTeacher />} />
        <Route path="/admin/delete-teacher" element={<DeleteTeacher />} />
       
        <Route path="/admin/logout" element={<Logout />} />

        {/* teacher roting */}
        <Route path="/teacher" element={<TeacherDash/>}/>
        <Route path="/teacher/classes" element={<ConductClasses />} />
        <Route path="/teacher/courses" element={<ManageCourses />} />
        <Route path="/teacher/grades" element={<GradeStudents />} />

        {/* student routing */}
        <Route path="/student" element={<StudentDash/>} />
        <Route path="/student/courseMaterial" element={<AccessCourseMaterials />} />
        <Route path="/student/attendance" element={<TrackAttendance />} />
        <Route path="/student/grades" element={<ViewGrades />} />

        {/* parent routing */}
        <Route path="/parent" element={<ParentDash/>} />
        <Route path="/parent/progress" element={<MonitorProgress />} />
        <Route path="/parent/fees" element={<PayFees />} />
      </Routes>
    </Router>
  );
}

export default App;
