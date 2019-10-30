import React, { useState, useEffect } from 'react';

import './tv.scss';
import Navbar from '../components/navbar';
import { addOrdersUpdateListener, refreshOrders, subscribeOrderUpdates } from '../utils/socket';
import { PaymentMethod } from '../components/basket';
import { Item } from '../categories';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders } from '../reducers/orders';
import { State } from '../reducers';

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
  const orders = useSelector((state: State) => state.orders);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    refreshOrders().then((orders) => {
      dispatch(setOrders(orders as Array<Order>));
    });

    dispatch(subscribeOrderUpdates());
  }, []);
  return (
    <div id="tv" onClick={() => history.push('/')}>
      {orders.map((order, index) => (
        <Order order={order} key={index} />
      ))}
    </div>
  );
};

export default View;
