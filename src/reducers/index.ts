import { combineReducers } from 'redux';

import basket from './basket';
import orgaPrice from './orgaPrice';
import { Item } from '../categories';

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