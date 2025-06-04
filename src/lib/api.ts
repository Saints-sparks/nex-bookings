// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/", // Update with your actual API base URL
});

export default api;
