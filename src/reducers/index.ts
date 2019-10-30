import { combineReducers } from 'redux';
import { Item } from '../categories';
import basket from './basket';
import orgaPrice from './orgaPrice';
import orders from './orders';
import login from './login';

const app = combineReducers({ basket, orgaPrice, orders, login });

export default app;

export interface State {
  basket: Array<Item>;
  orgaPrice: boolean;
}

export interface Action {
  type: string;
  payload: any;
}
