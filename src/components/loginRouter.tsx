import React, { ReactNode, useEffect } from 'react';
import { Router } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../reducers';
import Login from '../routes/login';
import { createBrowserHistory } from 'history';
import { autoLogin } from '../reducers/login';
import { Socket } from '../utils/socket';

export const history = createBrowserHistory();

const LoginRouter = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const login = useSelector((state: State) => state.login);

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  useEffect(() => {
    if (login.token) {
      dispatch(Socket.connect());
    }
  }, [login.token]);

  if (login.loading) return <div>Chargement...</div>;

  return login.token ? <Router history={history}>{children}</Router> : <Login />;
};

export default LoginRouter;
