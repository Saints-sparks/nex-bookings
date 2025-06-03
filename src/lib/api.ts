// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://2360-102-89-32-114.ngrok-free.app", // Update with your actual API base URL
});

export default api;
