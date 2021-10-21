import React from 'react';

import './index.scss';
import Navbar from '../components/navbar';
import FontAwesome from 'react-fontawesome';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/login';

import { history } from '../components/loginRouter';

const Index = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Navbar>
        <div className="logout" onClick={() => dispatch(logout())}>
          <FontAwesome name="sign-out-alt" /> Déconnexion
        </div>
      </Navbar>
      <div id="index">
        <div onClick={() => history.push('/sell?except=goodies')}>
          <FontAwesome name="hamburger" /> Vente de bouffe
        </div>
        <div onClick={() => history.push('/sell?only=goodies')}>
          <FontAwesome name="tshirt" /> Vente de goodies
        </div>
        <div onClick={() => history.push('/preparation')}>
          <FontAwesome name="check" /> Préparation générale
        </div>
        <div onClick={() => history.push('/preparation?only=pizzas')}>
          <FontAwesome name="pizza-slice" /> Préparation des pizzas
        </div>
        <div onClick={() => history.push('/tv')}>
          <FontAwesome name="tv" /> TV
        </div>
        <div onClick={() => history.push('/items')}>
          <FontAwesome name="receipt" /> Gestion des items
        </div>
      </div>
    </>
  );
};

export default Index;
