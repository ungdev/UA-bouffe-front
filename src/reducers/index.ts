import { combineReducers } from 'redux';
import { Item } from '../categories';
import basket from './basket';
import orgaPrice from './orgaPrice';

const app = combineReducers({ basket, orgaPrice });

export default app;

export interface State {
  basket: Array<Item>;
  orgaPrice: boolean;
}

export interface Action {
  type: string;
  payload: any;
}
