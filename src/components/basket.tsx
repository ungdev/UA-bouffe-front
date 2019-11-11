import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-fontawesome';

import './basket.scss';
import { useDispatch, useSelector } from 'react-redux';
import { clearBasket, removeItem } from '../reducers/basket';
import PaymentModal from './modals/payment';
import { setNormalPrice } from '../reducers/orgaPrice';
import { State, PaymentMethod, Promotion } from '../types';
import { addOrder } from '../utils/orders';
import { formatPrice } from '../utils/format';
import computePromotions from '../utils/promotions';

interface GroupedItem {
  id: number;
  name: string;
  firstIndex: number;
  count: number;
}

interface BasketItemProps {
  item: GroupedItem;
}

interface PromotionItemProps {
  promotion: Promotion;
}

const BasketItem = ({ item }: BasketItemProps) => {
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

const PromotionItem = ({ promotion }: PromotionItemProps) => {
  return (
    <div className="basket-item">
      <span className="item-name">{promotion.name}</span>
    </div>
  );
};

const Basket = () => {
  const dispatch = useDispatch();
  const orgaPrice = useSelector((state: State) => state.orgaPrice);
  const basket = useSelector((state: State) => state.basket);
  const promotionsComputation = computePromotions(basket, orgaPrice);

  const [paymentOpened, setPaymentOpened] = useState(false);

  const openPaymentModal = () => {
    if (basket.length !== 0) setPaymentOpened(true);
  };

  const onPay = async (place: string, method: PaymentMethod) => {
    await addOrder(basket, place, method, orgaPrice);
    dispatch(clearBasket());
    dispatch(setNormalPrice());
    setPaymentOpened(false);
  };

  const groupedBasket = basket.reduce((acc: Array<GroupedItem>, curr, index) => {
    const groupIndex = acc.findIndex((item) => item.name === curr.name);

    if (groupIndex !== -1) {
      acc[groupIndex].count += 1;
    } else {
      acc.push({
        id: curr.id,
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
        total={promotionsComputation.total}
        onPay={(place, method) => onPay(place, method)}
        onCancel={() => setPaymentOpened(false)}
      />
      <div className="summary">
        {groupedBasket.map((item, index) => (
          <BasketItem item={item} key={index} />
        ))}
        {promotionsComputation.promotions.map((promotion, index) => (
          <PromotionItem promotion={promotion} key={index} />
        ))}
      </div>
      <div className="pay" onClick={() => openPaymentModal()}>
        <span>{formatPrice(promotionsComputation.total)}</span>
        <FontAwesome name="check" />
      </div>
    </div>
  );
};

export default Basket;
