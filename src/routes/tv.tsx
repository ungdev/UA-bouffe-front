import React from 'react';

import './tv.scss';
import { useSelector } from 'react-redux';

import { history } from '../components/loginRouter';
import { Status, State, Order as OrderType } from '../types';

const Order = ({ order }: { order: OrderType }) => {
  return (
    <div className="order">
      <span>{order.id} -</span>
      <div className="status">
        <div className={`item pending ${order.status === Status.PENDING ? 'active' : ''}`}>Attente</div>
        <div className={`item preparing ${order.status === Status.PREPARING ? 'active' : ''}`}>Préparation</div>
        <div className={`item ready ${order.status === Status.READY ? 'active' : ''}`}>Prêt</div>
      </div>
    </div>
  );
};

const View = () => {
  const orders = useSelector((state: State) => state.orders);

  return (
    <div id="tv" onClick={() => history.push('/')}>
      {orders.map((order, index) => (
        <Order order={order} key={index} />
      ))}
    </div>
  );
};

export default View;
