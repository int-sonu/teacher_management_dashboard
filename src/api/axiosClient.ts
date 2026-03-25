import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'An error occurred';
    if (error.response) {
      errorMessage = `Error ${error.response.status}: ${error.response.data?.message || error.response.statusText || 'Unknown error'}`;
    } else if (error.request) {
      errorMessage = 'Network Error: No response received from server';
    } else {
      errorMessage = error.message;
    }
    return Promise.reject(new Error(errorMessage));
  }
);

export default client;
