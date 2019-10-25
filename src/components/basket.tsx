import React from 'react';

import './basket.scss'
import { State } from '../reducers'
import { Item } from '../categories';
import { useSelector } from 'react-redux';
import formatPrice from '../utils/formatPrice';

interface BasketItemPropTypes {
  item: Item;
}

const BasketItem = ({item} : BasketItemPropTypes) => {
  return (
  <div className="basket-item">
    <span className="item-name">{ item.name }</span>
    <div className="delete">X</div>
  </div>
    )
}

const Basket = () => {

  const orgaPrice = useSelector((state : State) => state.orgaPrice);
  const basket = useSelector((state : State) => state.basket);

  const calculateTotal = () => {
    const total = basket.reduce((acc, curr) => acc + (orgaPrice ? curr.orgaPrice : curr.price), 0)

    return formatPrice(total);
  }

  return (
    <div className="basket">
          <div className="summary">
            { basket.map(item => <BasketItem item={item} key={item.key}/>) }
          </div>
          <div className="pay">
            { calculateTotal() }
          </div>
    </div>
  )
}

export default Basket;