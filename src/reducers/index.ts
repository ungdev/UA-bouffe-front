import { combineReducers } from 'redux';
import basket from './basket';
import orgaPrice from './orgaPrice';
import orders from './orders';
import login from './login';

const app = combineReducers({ basket, orgaPrice, orders, login });

export default app;
