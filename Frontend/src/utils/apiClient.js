import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3500',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
