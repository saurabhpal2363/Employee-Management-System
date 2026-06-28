import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Reads token fresh before EVERY request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getEmployees = (params) => API.get('/employees', { params });
export const getEmployee = (id) => API.get(`/employees/${id}`);
export const createEmployee = (data) => API.post('/employees', data);
export const updateEmployee = (id, data) => API.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);
export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);

export default API;