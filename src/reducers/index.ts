import { combineReducers } from 'redux';
import { Item } from '../categories';
import basket from './basket';
import orgaPrice from './orgaPrice';
import orders from './orders';
import login from './login';
import history from './history';
import { Order } from '../routes/tv';

const app = combineReducers({ basket, orgaPrice, orders, login, history });

export default app;

export interface State {
  basket: Array<Item>;
  orgaPrice: boolean;
  orders: Array<Order>;
  token: string;
  history: any;
}

export interface Action {
  type: string;
  payload: any;
}
