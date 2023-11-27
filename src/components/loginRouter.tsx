import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '@/app/login/page';
import { autoLogin } from '@/reducers/login';
import { State } from '@/types';
import Loader from './pageLoader';
import { Action } from "redux";

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

  if (!state.login.token) return <Page />;

  return { children };
};

export default LoginRouter;
