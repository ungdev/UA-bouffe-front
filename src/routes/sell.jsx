import React from 'react';

import './sell.css';
import ItemsGrid from '../components/itemsGrid';

const Sell = () => {
  return (
    <div id="sell">
      <div className="header">
        <h1>UA - Bouffe</h1>
      </div>
      <div className="content">
        <div className="summary">
          <div className="bill">

          </div>
          <div className="pay">

          </div>
        </div>
        <ItemsGrid/>
      </div>
    </div>
  );
};


export default Sell;