import axios from 'axios';
import { toast } from 'react-toastify';
import errorToString from './errorToString';

const axiosAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});

export const API = {
  get: (route: string) =>
    new Promise((resolve, reject) => {
      axiosAPI
        .get(route)
        .then((res) => resolve(res))
        .catch((err) => {
          toast.error(errorToString(err.response ? err.response.data : 'UNKNOWN'));
          reject(err);
        });
    }),
  post: (route: string, body: object) =>
    new Promise((resolve, reject) => {
      axiosAPI
        .post(route, body)
        .then((res) => resolve(res))
        .catch((err) => {
          toast.error(errorToString(err.response ? err.response.data : 'UNKNOWN'));
          reject(err);
        });
    }),
  put: (route: string, body: object) =>
    new Promise((resolve, reject) => {
      axiosAPI
        .put(route, body)
        .then((res) => resolve(res))
        .catch((err) => {
          toast.error(errorToString(err.response ? err.response.data : 'UNKNOWN'));
          reject(err);
        });
    }),
  delete: (route: string, body: object) =>
    new Promise((resolve, reject) => {
      axiosAPI
        .delete(route, body)
        .then((res) => resolve(res))
        .catch((err) => {
          toast.error(errorToString(err.response ? err.response.data : 'UNKNOWN'));
          reject(err);
        });
    }),
};
