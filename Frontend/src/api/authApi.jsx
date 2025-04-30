
import axiosInstance from "./axiosInstance";

export const loginUser = async (username, password) => {
  const response = await axiosInstance.post("/auth/login", { username, password });
  return response.data;
};

export const registerUser = async (formData) => {
               const response = await axiosInstance.post("/auth/signup", formData);
               return response.data;
             };

        //  POST student
export const addStudent = async (studentData) => {
  const response = await axiosInstance.post("/students", studentData);
  return response.data;
};

//  GET students
export const getAllStudents = async () => {
  const response = await axiosInstance.get("/students");
  return response.data;
};

//  Add this PUT API
export const updateStudent = async (studentId, updatedData) => {
  const response = await axiosInstance.put(`/students/${studentId}`, updatedData);
  return response.data;
};

// DELETE API function
export const deleteStudent = async (studentId) => {
  const response = await axiosInstance.delete(`/students/${studentId}`);
  return response.data;
};

//  Search API function
export const searchStudent = async (namePrefix) => {
  const response = await axiosInstance.get(`/students/search?namePrefix=${namePrefix}`);
  return response.data;
};