import './sell.scss';
import React from 'react';
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
    <>
      <Navbar back="/">
        <PriceToogler />
      </Navbar>
      <div id="sell">
        <Basket />
        <ItemsGrid />
      </div>
    </>
  );
};

export default Sell;
