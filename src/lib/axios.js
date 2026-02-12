import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
  ? "http://localhost:5001/api": import.meta.env.VITE_API_URL,
    "https://le-unfluted-unpatiently.ngrok-free.dev": import.meta.env.VITE_API_URL, // Ngrok
  withCredentials: true,
})

console.log(import.meta.env);

export default axiosInstance