'use client';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { applyMiddleware, compose, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import React from 'react';

const logger = createLogger({ collapsed: true });
const middleware = [thunk, logger];
const composedEnhancers = compose(applyMiddleware(...middleware), ...[]);
const store = configureStore({
  reducer: reducers,
  middleware,
  enhancers: [composedEnhancers],
  devTools: process.env.NODE_ENV === 'development',
});

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
