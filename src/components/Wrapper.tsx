'use client';
import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/types';

import { autoLogin } from '@/reducers/login';
import Page from '@/app/login/page';

import Loader from './pageLoader';
import { type Action } from '@reduxjs/toolkit';

/**
 * Wrapper component that provides common layout and functionality for all pages.
 */
export default function Wrapper({
  children,
}: {
  /** The child components to be rendered within the layout. */
  children: ReactNode;
}) {
  // Import necessary hooks and modules
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);
  const pathname = usePathname();
  const router = useRouter();

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

  if (!state.login.token) router.push("/login");
  else if (pathname.match("/login")) router.push("/")


  // Render the layout with child components
  return (
    children
  );
}
