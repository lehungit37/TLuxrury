import axios, { AxiosError } from 'axios';
import { CConfig } from 'src/constants';

const HTTP_URL = `${CConfig.baseURL}/${CConfig.prefix}`;

export const getClientToken = () => {
  return axios.defaults.headers.common['Authorization'];
};

export const setClientToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const createClient = (url = HTTP_URL, isNew = false) => {
  // const baseURL = CConfig.isDev ? 'https://devmt.danateq.vn/api/v1' : HTTP_URL;
  const baseURL = HTTP_URL;

  const instance = axios.create({
    baseURL,
    timeout: 60000,
    headers: { 'Content-Type': 'application/json' },
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      return Promise.reject(error.response?.data);
    },
  );

  instance.interceptors.request.use(
    (config: any) => {
      config.headers = {
        Authorization: getClientToken(),
        ...config.headers,
      };
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return instance;
};
