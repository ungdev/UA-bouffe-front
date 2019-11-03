import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome';

import './basket.scss';
import { useDispatch, useSelector } from 'react-redux';
import formatPrice from '../utils/formatPrice';
import { clearBasket, removeItem } from '../reducers/basket';
import PaymentMethodModal from './modals/paymentMethod';
import ConfirmOrderModal from './modals/confirmOrder';
import { setNormalPrice } from '../reducers/orgaPrice';
import { Socket } from '../utils/socket';
import { Item, State, PaymentMethod } from '../types';

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
      <FontAwesome name="times" className="remove" onClick={() => removeBasketItem()} />
    </div>
  );
};

const Basket = () => {
  const dispatch = useDispatch();
  const orgaPrice = useSelector((state: State) => state.orgaPrice);
  const basket = useSelector((state: State) => state.basket);

  const [paymentOpened, setPaymentOpened] = useState(false);
  const [confirmOpened, setConfirmOpened] = useState(false);
  const [orderName, setOrderName] = useState('');

  const calculateTotal = () => {
    const total = basket.reduce((acc, curr) => acc + (orgaPrice ? curr.orgaPrice : curr.price), 0);
    return formatPrice(total);
  };

  const openPaymentModal = () => {
    if (basket.length !== 0) setPaymentOpened(true);
  };

  const onPay = (method: PaymentMethod) => {
    dispatch(clearBasket());
    dispatch(setNormalPrice());
    setPaymentOpened(false);

    Socket.addOrder('ESP_41', basket, method, orgaPrice);
    setOrderName("ESP_41 (en fait c'est sur fake ^^)");
    setConfirmOpened(true);
  };

  return (
    <div className="basket">
      <PaymentMethodModal
        isOpen={paymentOpened}
        onPay={(method) => onPay(method)}
        onCancel={() => setPaymentOpened(false)}
      />
      <ConfirmOrderModal isOpen={confirmOpened} onClose={() => setConfirmOpened(false)} orderName={orderName} />
      <div className="summary">
        {basket.map((item, index) => (
          <BasketItem item={item} key={index} index={index} />
        ))}
      </div>
      <div className="pay" onClick={() => openPaymentModal()}>
        <span>{calculateTotal()}</span>
        <FontAwesome name="check" />
      </div>
    </div>
  );
};

export default Basket;
