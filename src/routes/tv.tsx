import React, { useEffect } from 'react';

import './tv.scss';
import { useSelector } from 'react-redux';

import { history } from '../components/loginRouter';
import { State, Order as OrderType, Status, OrderItem } from '../types';

interface GroupedCategory {
  name: string;
  count: number;
}

const groupOrderItems = (items: Array<OrderItem>) => {
  return items.reduce((acc: Array<GroupedCategory>, curr) => {
    const categoryIndex = acc.findIndex((groupedCategory) => groupedCategory.name === curr.item.category.name);

    if (categoryIndex !== -1) {
      acc[categoryIndex].count += 1;
    } else {
      acc.push({
        name: curr.item.category.name,
        count: 1,
      });
    }

    return acc;
  }, []);
};

// Takes plural in account
const formatName = (name: string, count: number) => {
  if (name.endsWith('s') && count === 1) return name.slice(0, -1);

  return name;
};

const Order = ({ order }: { order: OrderType }) => {
  const groupedOrderItems = groupOrderItems(order.orderItems);
  return (
    <div className="card">
      <span className="title">{order.place}</span>
      <ul className="items">
        {groupedOrderItems.map((category, index) => {
          return (
            <li key={index}>
              {category.count} {formatName(category.name, category.count)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const OrderGrid = ({ orders }: { orders: Array<OrderType> }) => {
  return (
    <div className="cards">
      {orders.map((order, index) => (
        <Order key={index} order={order} />
      ))}
    </div>
  );
};

const Tv = () => {
  const orders = useSelector((state: State) => state.orders);

  const pendingOrders = orders.filter((order) => order.status === Status.PENDING || order.status === Status.PREPARING);
  const readyOrders = orders.filter((order) => order.status === Status.READY);

  useEffect(() => {
    // Hides scrollbars
    document.body.style.overflow = 'hidden';

    let scrolling = 1;
    let scroll = 0;

    const interval = setInterval(() => {
      window.scrollBy(0, scrolling);
      if (scroll == window.scrollY) {
        scrolling *= -1;
      }

      scroll = window.scrollY;
    }, 50);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = 'visible';
    };
  });

  return (
    <div id="tv" onClick={() => history.push('/')}>
      <div className="orders">
        <span>En attente</span>
        <OrderGrid orders={pendingOrders} />
      </div>
      <div className="center">
        <img className="logo" src={`${process.env.PUBLIC_URL}/ua.svg`} alt="" />
        <div className="separator"></div>
      </div>
      <div className="orders">
        <span>Prêt</span>
        <OrderGrid orders={readyOrders} />
      </div>
    </div>
  );
};

export default Tv;
