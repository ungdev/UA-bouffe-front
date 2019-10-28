import React, { useState, useEffect } from 'react';

import './tv.scss';
import Navbar from '../components/navbar';
import { addOrdersUpdateListener, refreshOrders } from '../utils/socket';
import { PaymentMethod } from '../components/basket';
import { Item } from '../categories';

export enum Status {
  PENDING = 'pending',
  PREPARATION = 'preparation',
  READY = 'ready',
}

export interface Order {
  name: string;
  method: PaymentMethod;
  status: Status;
  orderItems: Array<Item>;
}

const Order = ({ order }: { order: Order }) => {
  return (
    <div className="order">
      <span>
        {order.name} - {order.status}{' '}
      </span>
      <div className="status">
        <div className="item pending active">Attente</div>
        <div className="item preparing">Préparation</div>
        <div className="item ready">Prêt</div>
      </div>
    </div>
  );
};

const View = () => {
  const [orders, setOrders] = useState([] as Array<Order>);

  useEffect(() => {
    console.log('blblbl');
    refreshOrders().then((orders) => {
      console.log(orders);
      setOrders(orders as Array<Order>);
    });
  }, []);

  addOrdersUpdateListener((orders) => {
    console.log(orders);

    setOrders(orders);
  });
  return (
    <div id="tv">
      <Navbar back="/" />
      <div className="orders">
        {orders.map((order, index) => (
          <Order order={order} key={index} />
        ))}
      </div>
    </div>
  );
};

export default View;
