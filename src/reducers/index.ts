import { combineReducers } from 'redux';
import { Item } from '../categories';
import basket from './basket';
import orgaPrice from './orgaPrice';
import orders from './orders';
import login, { LoginState } from './login';
import { Order } from '../routes/tv';

const app = combineReducers({ basket, orgaPrice, orders, login });

export default app;

export interface State {
  basket: Array<Item>;
  orgaPrice: boolean;
  orders: Array<Order>;
  login: LoginState;
}

export interface Action {
  type: string;
  payload: any;
}
