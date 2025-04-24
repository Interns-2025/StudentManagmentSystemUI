
import axiosInstance from "./axiosInstance";

export const loginUser = async (username, password) => {
  const response = await axiosInstance.post("/auth/login", { username, password });
  return response.data;
};

export const registerUser = async (formData) => {
               const response = await axiosInstance.post("/auth/signup", formData);
               return response.data;
             };
