import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // your Flask backend
  withCredentials: true, // required to send cookies/session data
});

export default api;
