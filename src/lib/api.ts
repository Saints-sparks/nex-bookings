// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nex-be-ohft.onrender.com/',
});

export default api;
