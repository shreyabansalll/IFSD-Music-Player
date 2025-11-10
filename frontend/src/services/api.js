import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // ✅ backend API base URL
});

export default api;
