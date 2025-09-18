// lib/axios.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 👈 ส่ง cookie ไปกับทุก request
});

// Interceptor สำหรับ response
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Maybe session expired.");
      // อาจจะ redirect ไป login หรือ refresh token
    }
    return Promise.reject(error);
  }
);

export default apiClient;
