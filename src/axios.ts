import axios from "axios";
import type { AxiosInstance } from "axios"
const api: AxiosInstance = axios.create({
  baseURL: "http://192.168.110.125:8000/api/",
  timeout: 10000,
  withCredentials: true, // 🔑 send cookies automatically
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // All 2xx status codes will come here
    console.log("Response status:", response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Error status:", error.response.status);
      console.error("Error data:", error.response.data);
    } else {
      console.error("Request failed", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;