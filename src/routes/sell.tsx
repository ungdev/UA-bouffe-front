import './sell.scss';
import React from 'react';
import ItemsGrid from '../components/itemsGrid';
import Navbar from '../components/navbar';
import PriceToogler from '../components/priceToogler';
import Basket from '../components/basket';
import { useDispatch } from 'react-redux';
import { clearBasket } from '../reducers/basket';
/**
 * /sell
 *
 * Query params: ?only=(food|goodies)
 */

const Sell = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Navbar back="/" onBack={() => dispatch(clearBasket())}>
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
