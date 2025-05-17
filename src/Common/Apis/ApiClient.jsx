import axios from 'axios';
import ENDPOINTS from '../endpoints';

const apiClient = axios.create({
  baseURL: ENDPOINTS.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials : true
});

// Interceptor to dynamically get token and set headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const vr = localStorage.getItem('vr');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (vr) {
      config.headers['vr'] = vr; // custom header name
    }
    
    // Check if the request is a file upload and adjust headers accordingly
    if (config.is_file) {
      console.log(config.headers, 'headers')
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['vr'] = vr;
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
