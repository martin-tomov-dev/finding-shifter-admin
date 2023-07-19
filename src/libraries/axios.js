import axios from 'axios';

const baseURL = `${import.meta.env.VITE_BACKEND_ENDPOINT}/admin`;

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (refreshToken) {
    try {
      const res = await axios.post(`${baseURL}/auth/refresh-token`, {
        refresh_token: refreshToken
      });
      localStorage.setItem('refreshToken', res.data.refresh_token);
      localStorage.setItem('accessToken', res.data.access_token);
      return res.data;
    } catch (error) {
      localStorage.clear();
      window.location.href = '/login';
      return null;
    }
  } else {
    return null;
  }
};

const customizedAxios = (isPrivate = false) => {
  axios.defaults.baseURL = baseURL;

  if (!isPrivate) return axios;

  axios.interceptors.request.use(
    async (config) => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${accessToken}`
        };
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error?.config;

      if (error?.response?.status === 401 && !config?.sent) {
        config.sent = true;

        const result = await refreshAccessToken();

        if (result?.accessToken) {
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${result?.accessToken}`
          };
        }

        return axios(config);
      }
      return Promise.reject(error);
    }
  );

  return axios;
};

export default customizedAxios;
