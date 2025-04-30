import { useState, useEffect } from "react";
import { getAllStudents, updateStudent } from "../../api/authApi";
import "./AdminDashboard.css"; // simple css we'll create

const UpdateStudent = () => {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    grade: "",
    section: "",
    dob: "",
    address: "",
    parentId: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!studentId) {
      alert("Please enter Student ID to update.");
      return;
    }

    try {
      const cleanedData = {};
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== "") {
          cleanedData[key] = formData[key];
        }
      });

      await updateStudent(studentId, cleanedData);
      alert("Student updated successfully!");
      setFormData({
        name: "",
        email: "",
        grade: "",
        section: "",
        dob: "",
        address: "",
        parentId: "",
      });
      setStudentId("");
      fetchStudents(); // Refresh the table
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div className="update-student-container">
      <h2>Update Student</h2>
      <form className="update-student-form" onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Enter Student ID to update"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          type="text"
          name="name"
          placeholder="Name (leave blank to keep current)"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email (leave blank to keep current)"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade (leave blank to keep current)"
          value={formData.grade}
          onChange={handleChange}
        />
        <input
          type="text"
          name="section"
          placeholder="Section (leave blank to keep current)"
          value={formData.section}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dob"
          placeholder="DOB (leave blank to keep current)"
          value={formData.dob}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address (leave blank to keep current)"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="parentId"
          placeholder="Parent ID (leave blank to keep current)"
          value={formData.parentId}
          onChange={handleChange}
        />
        <button type="submit">Update Student</button>
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

export default UpdateStudent;

