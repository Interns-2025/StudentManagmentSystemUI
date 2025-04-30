import { useState, useEffect } from "react";
import { getAllStudents } from "../../api/authApi"; // Importing API call
import "./AdminDashboard.css"; // We'll also create a simple CSS file

const ViewStudent = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="view-student-container">
      <h2>Students List</h2>
      <table className="students-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Grade</th>
            <th>Section</th>
            <th>DOB</th>
            <th>Address</th>
            <th>Parent ID</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.grade}</td>
                <td>{student.section}</td>
                <td>{student.dob}</td>
                <td>{student.address}</td>
                <td>{student.parentId}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStudent;

