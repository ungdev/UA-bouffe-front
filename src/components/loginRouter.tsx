import React, { ReactNode, useEffect } from 'react';
import { Router } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../routes/login';
import { createBrowserHistory } from 'history';
import { autoLogin, setLoading } from '../reducers/login';
import { Socket } from '../utils/socket';
import { State } from '../types';
import Loading from './loading';

export const history = createBrowserHistory();

const LoginRouter = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  if (state.login.loading) return <Loading />;

  return state.login.token ? <Router history={history}>{children}</Router> : <Login />;
};

export default LoginRouter;
