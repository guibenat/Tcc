import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

// interceptador de erros
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("⚠️ AVISO: Tentando fazer requisição sem token para:", config.url);
  }
  
  return config;
});

export default api;