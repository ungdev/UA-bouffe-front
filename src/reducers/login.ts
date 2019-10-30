import { Action } from '.';
import { API } from '../utils/api';
import { toast } from 'react-toastify';

const initialState = null;

const BOUFFE_TOKEN = 'bouffe-token';
const SET_TOKEN = 'SET_TOKEN';

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.payload;
  }

  return state;
};

export const setToken = (token: string) => ({
  type: SET_TOKEN,
  payload: token,
});

export const autoLogin = () => (dispatch: any) => {
  if (localStorage.hasOwnProperty(BOUFFE_TOKEN)) {
    const token = localStorage.getItem(BOUFFE_TOKEN) as string;

    dispatch(setToken(token));
  }
};

export const tryLogin = (pin: string) => async (dispatch: any) => {
  const res = (await API.post(`/login?pin=${pin}`, {})) as any;
  const token = res.data.token;
  toast.success('Connexion validée');
  localStorage.setItem(BOUFFE_TOKEN, token);
  dispatch(setToken(token));
  // redirection ;)
};

export const logout = () => {
  localStorage.removeItem(BOUFFE_TOKEN);
  toast('Vous avez été déconnecté');

  return {
    type: SET_TOKEN,
    payload: null,
  };
};
