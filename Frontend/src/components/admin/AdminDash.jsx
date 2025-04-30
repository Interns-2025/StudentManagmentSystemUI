import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; //  Import the CSS file

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-title">Admin Dashboard</h1>

      <div className="admin-sections-container">

        {/* Student Section */}
        <div className="admin-section">
          <h2 className="admin-section-title"> Student Management</h2>
          <div className="admin-button-grid">
            <button onClick={() => handleNavigation("/admin/view-student")}>
              View Students
            </button>
            <button onClick={() => handleNavigation("/admin/add-student")}>
              Add Student
            </button>
            <button onClick={() => handleNavigation("/admin/update-student")}>
              Update Student
            </button>
            <button onClick={() => handleNavigation("/admin/delete-student")}>
              Delete Student
            </button>
            <button onClick={() => handleNavigation("/admin/search-student")}>
              Search Student
            </button>
          </div>
        </div>

        {/* Teacher Section */}
        <div className="admin-section">
          <h2 className="admin-section-title"> Teacher Management</h2>
          <div className="admin-button-grid">
            <button onClick={() => handleNavigation("/admin/view-teacher")}>
              View Teachers
            </button>
            <button onClick={() => handleNavigation("/admin/add-teacher")}>
              Add Teacher
            </button>
            <button onClick={() => handleNavigation("/admin/update-teacher")}>
              Update Teacher
            </button>
            <button onClick={() => handleNavigation("/admin/delete-teacher")}>
              Delete Teacher
            </button>
            <button onClick={() => handleNavigation("/admin/search-teacher")}>
              Search Teacher
            </button>
          </div>
        </div>

      </div>

      {/* Logout */}
      <button className="admin-logout-button" onClick={() => handleNavigation("/")}>
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
