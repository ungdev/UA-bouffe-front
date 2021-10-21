import axios, { Method, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import errorToString from './errorToString';

let token: string | null = null;

const requestAPI = <T>(method: Method, route: string, body?: { [key: string]: unknown }) => {
  return new Promise<AxiosResponse<T>>((resolve, reject) => {
    axios
      .request<T>({
        baseURL: process.env.REACT_APP_API_URI,
        method,
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        url: route,
        data: body,
        timeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 5000,
      })
      .then((res) => resolve(res))
      .catch((err) => {
        if (err.message === 'Network Error' || err.code === 'ECONNABORTED') toast.error('Connexion au serveur perdue');
        else toast.error(errorToString(err.response ? err.response.data.error : 'UNKNOWN'));
        reject();
      });
  });
};

export const setAPIToken = (_token: string | null) => {
  token = _token;
};

export const API = {
  get: <T>(route: string) => requestAPI<T>('GET', route),
  post: <T>(route: string, body: { [key: string]: unknown }) => requestAPI<T>('POST', route, body),
  put: <T>(route: string, body: { [key: string]: unknown }) => requestAPI<T>('PUT', route, body),
  patch: <T>(route: string, body: { [key: string]: unknown }) => requestAPI<T>('PATCH', route, body),
  delete: <T>(route: string) => requestAPI<T>('DELETE', route),
};
