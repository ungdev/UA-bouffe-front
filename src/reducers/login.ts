import { API, setAPIToken } from '../utils/api';
import { toast } from 'react-toastify';
import { Socket } from '../utils/socket';
import { clearOrders } from './orders';
import { clearBasket } from './basket';
import { Dispatch } from 'redux';
import { LoginState, Action, User } from '../types';

const initialState: LoginState = {
  token: null,
  loading: false,
  name: null,
  key: null,
};

const BOUFFE_TOKEN = 'bouffe-token';

const SET_LOGIN_LOADING = 'SET_LOGIN_LOADING';
const SET_TOKEN = 'SET_TOKEN';
const SET_NAME = 'SET_NAME';
const SET_USER = 'SET_USER';

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case SET_LOGIN_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case SET_NAME:
      return {
        ...state,
        name: action.payload,
      };

    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };
  }

  return state;
};

export const setUser = (user: User) => {
  setAPIToken(user.token);

  if (user.token) localStorage.setItem(BOUFFE_TOKEN, user.token);
  else localStorage.removeItem(BOUFFE_TOKEN);

  return {
    type: SET_USER,
    payload: user,
  };
};

export const setLoading = (loading: boolean) => ({
  type: SET_LOGIN_LOADING,
  payload: loading,
});

export const logout = () => (dispatch: Dispatch) => {
  Socket.disconnect();
  dispatch(clearOrders());
  dispatch(clearBasket());
  toast('Vous avez été déconnecté');
  dispatch(
    setUser({
      token: null,
      name: null,
      key: null,
    }),
  );
};

export const autoLogin = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  if (localStorage.hasOwnProperty(BOUFFE_TOKEN)) {
    const oldToken = localStorage.getItem(BOUFFE_TOKEN) as string;

    try {
      const res = (await API.post<User>('/auth/refreshToken', { token: oldToken })) as any;
      const { token, name, key } = res.data;

      dispatch(setUser({ token, name, key }));
    } catch (err) {
      dispatch(logout());
    }
  }
  dispatch(setLoading(false));
};

export const tryLogin = (pin: string) => async (dispatch: any) => {
  const res = await API.post<User>(`/auth/login`, { pin });
  const { token, name, key } = res.data;
  toast.success('Connexion validée');
  dispatch(setUser({ token, name, key }));
};
