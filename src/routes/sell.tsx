import './sell.scss';
import React from 'react';
import { useLocation } from 'react-router';
import { parse } from 'query-string';
import ItemsGrid from '../components/itemsGrid';
import Navbar from '../components/navbar';
import PriceToogler from '../components/priceToogler';
import Basket from '../components/basket';
import { useDispatch, useSelector } from 'react-redux';
import { clearBasket } from '../reducers/basket';
import { State } from '../types';
import { setLoading } from '../reducers/login';
/**
 * /sell
 *
 * Query params: ?only=(food|goodies)
 */

const Sell = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  let categories = useSelector((state: State) => state.categories);
  const queryParams = parse(location.search);

  if (queryParams.only) {
    categories = categories.filter((category) => category.key === queryParams.only);
  } else if (queryParams.except) {
    categories = categories.filter((category) => category.key !== queryParams.except);
  }

  if (categories.length === 0) return <div>Chargement...</div>;

  return (
    <>
      <Navbar back="/" onBack={() => dispatch(clearBasket())}>
        <PriceToogler />
      </Navbar>
      <div id="sell">
        <Basket />
        <ItemsGrid categories={categories} />
      </div>
    </>
  );
};

export default Sell;
