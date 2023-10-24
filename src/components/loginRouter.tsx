import React, { ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../routes/login';
import { autoLogin } from '../reducers/login';
import { State } from '../types';
import Loader from './pageLoader';
import { Action } from 'redux';

const LoginRouter = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);

  useEffect(() => {
    dispatch(autoLogin() as unknown as Action);
  }, []); // eslint-disable-line

  if (!state.server.socketConnected) {
    return (
      <Loader>
        <div onClick={() => window.location.reload()}>
          Serveur déconnecté
          <br />
          Tentative de reconnexion en cours
        </div>
      </Loader>
    );
  }

  if (state.login.loading) return <Loader />;

  if (!state.login.token) return <Login />;

  return { children };
};

export default LoginRouter;
