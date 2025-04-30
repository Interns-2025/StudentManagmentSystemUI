import { useState, useEffect } from "react";
import { getAllStudents, deleteStudent } from "../../api/authApi";
import "./AdminDashboard.css"; // We'll create simple css

const DeleteStudent = () => {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");

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

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!studentId) {
      alert("Please enter a Student ID to delete.");
      return;
    }

    try {
      await deleteStudent(studentId);
      alert(`Student with ID ${studentId} deleted successfully!`);
      setStudentId("");
      fetchStudents(); // Refresh the table after delete
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="delete-student-container">
      <h2>Delete Student</h2>
      <form className="delete-student-form" onSubmit={handleDelete}>
        <input
          type="text"
          placeholder="Enter Student ID to delete"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button type="submit">Delete Student</button>
      </form>

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

export default DeleteStudent;

