import axios from 'axios';
import { toast } from 'react-toastify';

let axiosAPI = axios.create({
  baseURL: process.env.ARENA_API_URI,
  headers: { 'X-Token': '' },
});

const setTokenAPI = (token: string) => {
  axiosAPI = axios.create({
    baseURL: process.env.ARENA_API_URI,
    headers: { 'X-Token': token },
  });
};

const API = {
  get: (route: string) =>
    new Promise((resolve, reject) => {
      axiosAPI
        .get(route)
        .then((res) => resolve(res))
        .catch((err) => {
          toast.error('Erreur :/');
          reject(err);
        });
    }),
  post: (route: string, body: object) =>
    new Promise((resolve, reject) => {
      axiosAPI
        .post(route, body)
        .then((res) => resolve(res))
        .catch((err) => {
          toast.error('Erreur :/');
          reject(err);
        });
    }),
  put: (route: string, body: object) =>
    new Promise((resolve, reject) => {
      axiosAPI
        .put(route, body)
        .then((res) => resolve(res))
        .catch((err) => {
          toast.error('Erreur :/');
          reject(err);
        });
    }),
  delete: (route: string, body: object) =>
    new Promise((resolve, reject) => {
      axiosAPI
        .delete(route, body)
        .then((res) => resolve(res))
        .catch((err) => {
          toast.error('Erreur :/');
          reject(err);
        });
    }),
};
