import React, { useState, useEffect } from 'react';

import './tv.scss';
import Navbar from '../components/navbar';
import { addOrdersUpdateListener, refreshOrders } from '../utils/socket';
import { PaymentMethod } from '../components/basket';
import { Item } from '../categories';

export enum Status {
  PENDING = 'pending',
  PREPARING = 'preparing',
  READY = 'ready',
}

export interface Order {
  id: number;
  method: PaymentMethod;
  status: Status;
  orderItems: Array<Item>;
}

const Order = ({ order }: { order: Order }) => {
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
