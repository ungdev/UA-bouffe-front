import React, { ReactNode, useEffect } from 'react';
import { Router } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../routes/login';
import { createBrowserHistory } from 'history';
import { autoLogin } from '../reducers/login';
import { State } from '../types';
import Loader from './pageLoader';

export const history = createBrowserHistory();

const LoginRouter = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);

  useEffect(() => {
    dispatch(autoLogin());
  }, []); // eslint-disable-line

  if (!state.server.socketConnected) {
    return (
      <Loader>
        Serveur déconnecté
        <br />
        Tentative de reconnexion en cours
      </Loader>
    );
  }

  if (state.login.loading) return <Loader />;

  if (!state.login.token) return <Login />;

  return <Router history={history}>{children}</Router>;
};

export default LoginRouter;
