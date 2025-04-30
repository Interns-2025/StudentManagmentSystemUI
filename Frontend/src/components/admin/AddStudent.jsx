import { useState, useEffect } from "react";
import { addStudent, getAllStudents } from "../../api/authApi"; // ⬅ import from authapi.js
import "./AdminDashboard.css";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    grade: "",
    section: "",
    dob: "",
    address: "",
    parentId: "",
  });

  const [students, setStudents] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudent(formData); // ⬅ using addStudent() from authapi
      setSuccessMessage("Student added successfully!");
      setFormData({
        name: "",
        email: "",
        grade: "",
        section: "",
        dob: "",
        address: "",
        parentId: "",
      });
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents(); // ⬅ using getAllStudents() from authapi
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="add-student-container">
      <h2>Enter Student Details:</h2>
      <form onSubmit={handleSubmit} className="add-student-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={formData.grade}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="section"
          placeholder="Section"
          value={formData.section}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="parentId"
          placeholder="Parent ID"
          value={formData.parentId}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Student</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Students Table */}
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

export default AddStudent;
