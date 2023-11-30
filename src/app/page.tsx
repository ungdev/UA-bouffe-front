'use client';
import React from 'react';
import 'moment/locale/fr';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import Navbar from '@/components/navbar';
import FontAwesome from 'react-fontawesome';
import { logout } from '@/reducers/login';
import { Action } from 'redux';
import { useRouter } from 'next/navigation';

moment.locale('fr');

const App = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <>
      <Navbar>
        <div className="logout" onClick={() => dispatch(logout() as unknown as Action)}>
          <FontAwesome name="sign-out-alt" /> Déconnexion
        </div>
      </Navbar>
      <div id="index">
        <div onClick={() => router.push('/sell?except=goodies')}>
          <FontAwesome name="hamburger" /> Vente de bouffe
        </div>
        <div onClick={() => router.push('/sell?only=goodies')}>
          <FontAwesome name="tshirt" /> Vente de goodies
        </div>
        <div onClick={() => router.push('/preparation')}>
          <FontAwesome name="check" /> Préparation générale
        </div>
        <div onClick={() => router.push('/preparation?only=pizzas')}>
          <FontAwesome name="pizza-slice" /> Préparation des pizzas
        </div>
        <div onClick={() => router.push('/tv')}>
          <FontAwesome name="tv" /> TV
        </div>
        <div onClick={() => router.push('/items')}>
          <FontAwesome name="receipt" /> Gestion des items
        </div>
      </div>
    </>
  );
};

export default App;
