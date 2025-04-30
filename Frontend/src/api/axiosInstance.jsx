
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // backend base URL
  headers: {
    "Content-Type": "application/json", // data format for the requests
  },
});

export default axiosInstance;
