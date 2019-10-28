import React from 'react';
import { useHistory } from 'react-router-dom';

import './index.scss';
import Navbar from '../components/navbar';

const Index = () => {
  const history = useHistory();

  return (
    <div id="index">
      <Navbar />
      <div className="menu">
        <div onClick={() => history.push('/sell?only=food')}>Vente de bouffe</div>
        <div onClick={() => history.push('/sell?only=goodies')}>Vente de goodies</div>
        <div onClick={() => history.push('/tv')}>Suivi des commandes</div>
        <div>Préparation</div>
      </div>
    </div>
  );
};

export default Index;
