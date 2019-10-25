import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Item as ItemInterface } from '../categories';

import './item.scss';
import { State } from '../reducers';
import { addItem } from '../reducers/basket';

const formatPrice = (price : number) => {
  return `${price / 100} €`;
};

interface PropTypes {
  item: ItemInterface;
}

const Item = ({ item } : PropTypes) => {

  const dispatch = useDispatch();
  const orgaPrice = useSelector((state : State) => state.orgaPrice);

  const displayPrice = () => {
    if(orgaPrice) {
      return formatPrice(item.orgaPrice);
    }

    return formatPrice(item.price);
  };

  const addToBasket = () => {
    dispatch(addItem(item));
  }

  return (
    <div className='item' onClick={() => addToBasket()}>
      { item.name } - <br/> { displayPrice() }
    </div>
  );
};

export default Item;