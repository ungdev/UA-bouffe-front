import React, { useState } from 'react';

import './basket.scss';
import { State } from '../reducers';
import { Item } from '../categories';
import { useSelector, useDispatch } from 'react-redux';
import formatPrice from '../utils/formatPrice';
import { removeItem, clearBasket } from '../reducers/basket';
import ConfirmationModal from './confirmationModal';

export enum PaymentMethod {
  Card = "card", Cash = "cash"
};

interface BasketItemPropTypes {
  item: Item;
  index: number;
}

const BasketItem = ({ item, index }: BasketItemPropTypes) => {
  const dispatch = useDispatch();

  const removeBasketItem = () => {
    dispatch(removeItem(index));
  };

  return (
    <div className="basket-item">
      <span className="item-name">{item.name}</span>
      <div className="delete" onClick={() => removeBasketItem()}>
        X
      </div>
    </div>
  );
};

const Basket = () => {
  const dispatch = useDispatch();
  const orgaPrice = useSelector((state: State) => state.orgaPrice);
  const basket = useSelector((state: State) => state.basket);

  const [modalOpened, setModalOpened] = useState(false);

  const calculateTotal = () => {
    const total = basket.reduce((acc, curr) => acc + (orgaPrice ? curr.orgaPrice : curr.price), 0);

    return formatPrice(total);
  };

  const openConfirm = () => {
    setModalOpened(true);
  };

  const closeConfirm = () => {
    setModalOpened(false);
  };

  const pay = (method: PaymentMethod) => {
    dispatch(clearBasket());
    closeConfirm();
  };

  return (
    <div className="basket">
      <ConfirmationModal
        isOpen={modalOpened}
        onPay={(method) => pay(method)}
        onCancel={() => closeConfirm()}/>
      <div className="summary">
        {basket.map((item, index) => (
          <BasketItem item={item} key={index} index={index} />
        ))}
      </div>
      <div className="pay" onClick={() => openConfirm()}>
        {calculateTotal()}
      </div>
    </div>
  );
};

export default Basket;