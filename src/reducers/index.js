import { combineReducers } from 'redux';

import basket from './basket';
import orgaPrice from './orgaPrice';

const app = combineReducers({ basket, orgaPrice });

export default app;