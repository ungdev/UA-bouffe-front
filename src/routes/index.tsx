import React from 'react';
import { useHistory } from 'react-router-dom';

import './index.scss';
import Navbar from '../components/navbar';
import { useDispatch } from 'react-redux';
import { autoLogin, logout } from '../reducers/login';

const Index = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  dispatch(autoLogin(history));

  return (
    <>
      <Navbar>
        <div className="logout" onClick={() => dispatch(logout(history))}>
          Déconnexion
        </div>
      </Navbar>
      <div id="index">
        <div onClick={() => history.push('/sell?only=food')}>Vente de bouffe</div>
        <div onClick={() => history.push('/sell?only=goodies')}>Vente de goodies</div>
        <div onClick={() => history.push('/preparation')}>Préparation</div>
        <div onClick={() => history.push('/tv')}>Suivi des commandes</div>
      </div>
    </>
  );
};

export default Index;
