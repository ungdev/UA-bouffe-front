import React from 'react';

import './basket.scss'
import { State } from '../reducers'
import { Item } from '../categories';
import { useSelector } from 'react-redux';

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

  const basket = useSelector((state : State) => state.basket);

  return (
    <div className="basket">
          <div className="summary">
            { basket.map(item => <BasketItem item={item} key={item.key}/>) }
          </div>
          <div className="pay">
            0.00€
          </div>
    </div>
  )
}

export default Basket;