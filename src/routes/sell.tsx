import React from 'react';

import './sell.css';
import ItemsGrid from '../components/itemsGrid';
import Navbar from '../components/navbar';
import PriceToogler from '../components/priceToogler';

const Sell = () => {
  return (
    <div id="sell">
      <Navbar back="/">
        <PriceToogler/>
      </Navbar>
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