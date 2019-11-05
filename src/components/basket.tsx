import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome';

import './basket.scss';
import { useDispatch, useSelector } from 'react-redux';
import { clearBasket, removeItem } from '../reducers/basket';
import PaymentModal from './modals/payment';
import ConfirmOrderModal from './modals/confirmOrder';
import { setNormalPrice } from '../reducers/orgaPrice';
import { Item, State, PaymentMethod } from '../types';
import { addOrder } from '../utils/orders';
import { formatPrice } from '../utils/format';

interface GroupedItem {
  name: string;
  firstIndex: number;
  count: number;
}

interface BasketItemPropTypes {
  item: GroupedItem;
}

const BasketItem = ({ item }: BasketItemPropTypes) => {
  const dispatch = useDispatch();

  const removeBasketItem = () => {
    dispatch(removeItem(item.firstIndex));
  };

  return (
    <div className="basket-item">
      <span className="item-name">
        {item.count} {item.name}
      </span>
      <FontAwesome name="minus" className="remove" onClick={() => removeBasketItem()} />
    </div>
  );
};

const Basket = () => {
  const dispatch = useDispatch();
  const orgaPrice = useSelector((state: State) => state.orgaPrice);
  const basket = useSelector((state: State) => state.basket);

  const [paymentOpened, setPaymentOpened] = useState(true);
  const [confirmOpened, setConfirmOpened] = useState(false);
  const [orderName, setOrderName] = useState('');

  const calculateTotal = () => {
    const total = basket.reduce((acc, curr) => acc + (orgaPrice ? curr.orgaPrice : curr.price), 0);
    return formatPrice(total);
  };

  const openPaymentModal = () => {
    if (basket.length !== 0) setPaymentOpened(true);
  };

  const onPay = async (place: string, method: PaymentMethod) => {
    dispatch(clearBasket());
    dispatch(setNormalPrice());

    await addOrder(basket, place, method, orgaPrice);

    setOrderName(`${place} ${method}`);
    setPaymentOpened(false);
    setConfirmOpened(true);
  };

  const groupedBasket = basket.reduce((acc: Array<GroupedItem>, curr, index) => {
    const groupIndex = acc.findIndex((item) => item.name === curr.name);

    if (groupIndex !== -1) {
      acc[groupIndex].count += 1;
    } else {
      acc.push({
        name: curr.name,
        firstIndex: index,
        count: 1,
      });
    }

    return acc;
  }, []);

  return (
    <div className="basket">
      <PaymentModal
        isOpen={paymentOpened}
        onPay={(place, method) => onPay(place, method)}
        onCancel={() => setPaymentOpened(false)}
      />
      <ConfirmOrderModal isOpen={confirmOpened} onClose={() => setConfirmOpened(false)} orderName={orderName} />
      <div className="summary">
        {groupedBasket.map((item, index) => (
          <BasketItem item={item} key={index} />
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
