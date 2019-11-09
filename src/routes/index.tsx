import React from 'react';

import './index.scss';
import Navbar from '../components/navbar';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/login';

import { history } from '../components/loginRouter';

const Index = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Navbar>
        <div className="logout" onClick={() => dispatch(logout())}>
          Déconnexion
        </div>
      </Navbar>
      <div id="index">
        <div onClick={() => history.push('/sell?except=goodies')}>Vente de bouffe</div>
        <div onClick={() => history.push('/sell?only=goodies')}>Vente de goodies</div>
        <div onClick={() => history.push('/preparation')}>Préparation générale</div>
        <div onClick={() => history.push('/preparation?only=pizzas')}>Préparation des pizzas</div>
        <div onClick={() => history.push('/tv')}>TV</div>
        <div onClick={() => history.push('/items')}>Gestion des items</div>
      </div>
    </>
  );
};

export default Index;
