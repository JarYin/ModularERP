// lib/axios.ts
import axios from "axios";
import { getSession } from "./session";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 👈 ส่ง cookie ไปกับทุก request
});

// Interceptor สำหรับ request → ใส่ token อัตโนมัติ
apiClient.interceptors.request.use(async (config) => {
  const accessToken = await getSession(); // คืนค่าเป็น string
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
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
