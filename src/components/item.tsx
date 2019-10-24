import React from 'react';
import { useSelector } from 'react-redux';
import { Item as ItemInterface } from '../categories';

import './item.scss';
import { State } from '../reducers';

const formatPrice = (price : number) => {
  return `${price / 100} €`;
};

interface PropTypes {
  item: ItemInterface;
}

const Item = ({ item } : PropTypes) => {

  const orgaPrice = useSelector((state : State) => state.orgaPrice);

  const displayPrice = () => {
    if(orgaPrice) {
      return formatPrice(item.orgaPrice);
    }

    return formatPrice(item.price);
  };

  return (
    <div className='item'>
      { item.name } - <br/> { displayPrice() }
    </div>
  );
};

export default Item;