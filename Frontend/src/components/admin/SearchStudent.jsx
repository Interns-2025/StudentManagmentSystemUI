import { useState } from "react";
import { searchStudent } from "../../api/authApi";
import "./AdminDashboard.css";

const SearchStudent = () => {
  const [namePrefix, setNamePrefix] = useState("");
  const [students, setStudents] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!namePrefix) {
      alert("Please enter a name prefix to search.");
      return;
    }

    try {
      const data = await searchStudent(namePrefix);
      setStudents(data);
    } catch (error) {
      console.error("Error searching students:", error);
    }
  };

  return (
    <div className="search-student-container">
      <h2>Search Student</h2>
      <form className="search-student-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter name prefix"
          value={namePrefix}
          onChange={(e) => setNamePrefix(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <h2>Matching Students</h2>
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
              <td colSpan="8">No matching students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SearchStudent;

