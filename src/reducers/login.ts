import { Action } from '.';
import { API } from '../utils/api';
import { toast } from 'react-toastify';
import { Socket } from '../utils/socket';
import { clearOrders } from './orders';
import { clearBasket } from './basket';
import { Dispatch } from 'redux';

export interface LoginState {
  token: string;
  loading: boolean;
}

const initialState: LoginState = {
  token: null,
  loading: false,
};

const BOUFFE_TOKEN = 'bouffe-token';

const SET_LOADING = 'SET_LOADING';
const SET_TOKEN = 'SET_TOKEN';

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
  }

  return state;
};

export const setToken = (token: string | null) => ({
  type: SET_TOKEN,
  payload: token
});

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading
});

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem(BOUFFE_TOKEN);
  Socket.disconnect();
  dispatch(clearOrders());
  dispatch(clearBasket());
  toast('Vous avez été déconnecté');
  dispatch(setToken(null));
};

export const autoLogin = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  if (localStorage.hasOwnProperty(BOUFFE_TOKEN)) {
    const oldToken = localStorage.getItem(BOUFFE_TOKEN) as string;

    try {
      const res = (await API.post('/refreshToken', { token: oldToken })) as any;
      const token = res.data.token;

      localStorage.setItem(BOUFFE_TOKEN, token);
      dispatch(setToken(token));
    } catch (err) {
      dispatch(logout());
    }
  }
  dispatch(setLoading(false));
};

export const tryLogin = (pin: string) => async (dispatch: any) => {
  const res = await API.post<{ token: string }>(`/login`, { pin });
  const token = res.data.token;
  toast.success('Connexion validée');
  localStorage.setItem(BOUFFE_TOKEN, token);

  dispatch(setToken(token));
};
