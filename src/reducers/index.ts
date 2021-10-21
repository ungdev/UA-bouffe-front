import { combineReducers } from 'redux';
import basket from './basket';
import orgaPrice from './orgaPrice';
import orders from './orders';
import login from './login';
import categories from './categories';
import promotions from './promotions';
import server from './server';
import { State } from '../types';

const app = combineReducers<State>({ basket, orgaPrice, orders, login, categories, promotions, server });

export default app;
