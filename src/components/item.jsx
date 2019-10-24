import React from 'react';
import { useSelector } from 'react-redux';

import './item.scss';

const formatPrice = (price) => {
  return `${price / 100} €`;
};

const Item = ({ item }) => {

  const orgaPrice = useSelector((state) => state.orgaPrice);

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