'use client';
import React from 'react';
import 'moment/locale/fr';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import Navbar from '@/components/navbar';
import FontAwesome from 'react-fontawesome';
import { logout } from '@/reducers/login';
import { Action } from 'redux';
import Link from 'next/link';

moment.locale('fr');

const App = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Navbar>
        <div className="logout" onClick={() => dispatch(logout() as unknown as Action)}>
          <FontAwesome name="sign-out-alt" /> Déconnexion
        </div>
      </Navbar>
      <div id="index">
        <div>
          <Link href="/sell?except=goodies">
            <FontAwesome name="hamburger" /> Vente de bouffe
          </Link>
        </div>
        <div>
          <Link href="/sell?only=goodies">
            <FontAwesome name="tshirt" /> Vente de goodies
          </Link>
        </div>
        <div>
          <Link href="/preparation">
            <FontAwesome name="check" /> Préparation générale
          </Link>
        </div>
        <div>
          <Link href="/preparation?only=pizzas">
            <FontAwesome name="pizza-slice" /> Préparation des pizzas
          </Link>
        </div>
        <div>
          <Link href="/tv">
            <FontAwesome name="tv" /> TV
          </Link>
        </div>
        <div>
          <Link href="/items">
            <FontAwesome name="receipt" /> Gestion des items
          </Link>
        </div>
      </div>
    </>
  );
};

export default App;
