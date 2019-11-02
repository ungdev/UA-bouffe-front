import axios, { Method, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import errorToString from './errorToString';

const requestAPI = <T>(method: Method, route: string, body?: object) => {
  return new Promise<AxiosResponse<T>>((resolve, reject) => {
    axios
      .request<T>({
        baseURL: process.env.REACT_APP_API_URI,
        method,
        url: route,
        data: body,
      })
      .then((res) => resolve(res))
      .catch((err) => {
        toast.error(errorToString(err.response ? err.response.data : 'UNKNOWN'));
        reject();
      });
  });
};

export const API = {
  get: <T>(route: string) => requestAPI<T>('GET', route),
  post: <T>(route: string, body: object) => requestAPI<T>('POST', route, body),
  put: <T>(route: string, body: object) => requestAPI<T>('PUT', route, body),
  delete: <T>(route: string) => requestAPI<T>('DELETE', route),
};
