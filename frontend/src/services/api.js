import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar token a cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funciones de autenticación
export const authService = {
  register: async (nombre, email, password) => {
    const response = await api.post('/users/register', { nombre, email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/users/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/users/forgotpassword', { email });
    return response.data;
  },

  resetPassword: async (resettoken, password) => {
    const response = await api.put(`/users/resetpassword/${resettoken}`, { password });
    return response.data;
  },
};

// Funciones de tareas
export const taskService = {
  createTask: async (titulo, descripcion, prioridad, fechaVencimiento) => {
    const response = await api.post('/tasks', { titulo, descripcion, prioridad, fechaVencimiento });
    return response.data;
  },

  getTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  getTaskById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  updateTask: async (id, updatedTask) => {
    const response = await api.put(`/tasks/${id}`, updatedTask);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default api;
