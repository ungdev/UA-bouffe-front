import React from 'react';
import { useHistory } from 'react-router-dom';

import './index.css';

const Index = () => {
  const history = useHistory();

  return (
    <div id="index">
      <h1>UA - Bouffe</h1>
      <div className="menu">
        <div onClick={() => history.push('/sell?only=food')}>Vente de bouffe</div>
        <div onClick={() => history.push('/sell?only=goodies')}>Vente de goodies</div>
        <div>Suivi des commandes</div>
        <div>Préparation</div>
      </div>
    </div>
  );
};

export default Index;