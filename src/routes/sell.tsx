import React from 'react';

import './sell.scss';
import ItemsGrid from '../components/itemsGrid';
import Navbar from '../components/navbar';
import PriceToogler from '../components/priceToogler';
import Basket from '../components/basket';
/**
 * /sell
 *
 * Query params: ?only=(food|goodies)
 */

const Sell = () => {
  return (
    <div id="sell">
      <Navbar back="/">
        <PriceToogler />
      </Navbar>
      <div className="content">
        <Basket />
        <ItemsGrid />
      </div>
    </div>
  );
};

export default Sell;
