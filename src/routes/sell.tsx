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
import { setNormalPrice } from '../reducers/orgaPrice';
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

  categories = categories.map((category) => ({
    ...category,
    items: category.items.filter((item) => item.available),
  }));

  const onBack = () => {
    dispatch(clearBasket());
    dispatch(setNormalPrice());
  };

  return (
    <>
      <Navbar back="/" onBack={() => onBack()}>
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
