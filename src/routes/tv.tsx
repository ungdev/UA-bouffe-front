import React from 'react';

import './tv.scss';
import { useSelector } from 'react-redux';

import { history } from '../components/loginRouter';
import { State, Order as OrderType, Status } from '../types';

const Order = ({ order }: { order: OrderType }) => {
  return (
    <div className="card">
      <span className="title">{order.place}</span>
      <ul className="items">
        {order.orderItems.map((orderItem, index) => (
          <li key={index}>{orderItem.item.name}</li>
        ))}
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

const View = () => {
  const orders = useSelector((state: State) => state.orders);

  const pendingOrders = orders.filter((order) => order.status === Status.PENDING || order.status === Status.PREPARING);
  const readyOrders = orders.filter((order) => order.status === Status.READY);

  return (
    <div id="tv" onClick={() => history.push('/')}>
      <div className="orders">
        <span>En attente...</span>
        <OrderGrid orders={pendingOrders} />
      </div>
      <div className="separator"></div>
      <div className="orders">
        <span>Prêt</span>
        <OrderGrid orders={readyOrders} />
      </div>
    </div>
  );
};

export default View;
