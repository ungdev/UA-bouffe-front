import { API, setAPIToken } from '../utils/api';
import { toast } from 'react-toastify';
import { Socket } from '../utils/socket';
import { clearOrders, setOrders } from './orders';
import { clearBasket } from './basket';
import { LoginState, User, Action, Dispatch } from '../types';
import { clearPromotions, setPromotions } from './promotions';
import { getOrders } from '../utils/orders';
import { getCategories } from '../utils/categories';
import { setCategories } from './categories';
import { getPromotions } from '../utils/promotions';

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
  dispatch(clearOrders());
  dispatch(clearBasket());
  dispatch(clearPromotions());
  toast('Vous avez été déconnecté');
  dispatch(
    setUser({
      token: null,
      name: null,
      key: null,
    }),
  );
};

export const fetchData = () => async (dispatch: Dispatch) => {
  const orders = await getOrders();
  dispatch(setOrders(orders));

  const categories = await getCategories();
  dispatch(setCategories(categories));

  const promotions = await getPromotions();
  dispatch(setPromotions(promotions));

  dispatch(setLoading(false));
};

export const autoLogin = () => async (dispatch: Dispatch) => {
  dispatch(Socket.connect());
  dispatch(setLoading(true));
  if (localStorage.hasOwnProperty(BOUFFE_TOKEN)) {
    const oldToken = localStorage.getItem(BOUFFE_TOKEN) as string;

    try {
      const res = await API.post<User>('/auth/refreshToken', { token: oldToken });
      const { token, name, key } = res.data;

      dispatch(setUser({ token, name, key }));
      dispatch(fetchData());
    } catch (err) {
      dispatch(logout());
      dispatch(setLoading(false));
    }
  } else {
    dispatch(setLoading(false));
  }
};

export const tryLogin = (pin: string) => async (dispatch: Dispatch) => {
  const res = await API.post<User>(`/auth/login`, { pin });
  const { token, name, key } = res.data;
  toast.success('Connexion validée');
  dispatch(setLoading(true));
  dispatch(setUser({ token, name, key }));
  dispatch(fetchData());
};
