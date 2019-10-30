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

export const logout = (history: any) => (dispatch: any) => {
  localStorage.removeItem(BOUFFE_TOKEN);
  toast('Vous avez été déconnecté');
  dispatch(setToken(''));

  history.push('/login');
};

export const autoLogin = (history: any) => async (dispatch: any) => {
  if (localStorage.hasOwnProperty(BOUFFE_TOKEN)) {
    const oldToken = localStorage.getItem(BOUFFE_TOKEN) as string;

    try {
      const res = (await API.post('/refreshToken', { token: oldToken })) as any;
      const token = res.data.token;

      localStorage.setItem(BOUFFE_TOKEN, token);
      dispatch(setToken(token));
    } catch (err) {
      dispatch(logout(history));
    }
  }
};

export const tryLogin = (pin: string, history: any) => async (dispatch: any) => {
  const res = (await API.post(`/login`, { pin })) as any;
  const token = res.data.token;
  toast.success('Connexion validée');
  localStorage.setItem(BOUFFE_TOKEN, token);
  dispatch(setToken(token));
  history.push('/');
};
