// Archivo: apps/web/src/lib/api.ts
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api'; // Apunta a la ruta del proxy de Nginx
const TOKEN_COOKIE_NAME = 'access_token';

// Creamos una instancia de Axios con configuración base
const apiClient = axios.create({
  baseURL: API_URL,
});

// Usamos un "interceptor" para modificar cada petición ANTES de que se envíe.
// Esto es perfecto para añadir el token de autenticación.
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get(TOKEN_COOKIE_NAME);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;