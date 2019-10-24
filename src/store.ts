import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


import reducers from './reducers';

const logger = createLogger();
const store = createStore(reducers, applyMiddleware(logger, thunk));

export default store;