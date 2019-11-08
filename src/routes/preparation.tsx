import React, { useEffect } from 'react';

import './preparation.scss';
import Navbar from '../components/navbar';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import { useSelector } from 'react-redux';
import { Socket } from '../utils/socket';
import { State, Order, Status } from '../types';
import { API } from '../utils/api';
import { upgradeOrder } from '../utils/orders';

const Preparation = () => {
  const orders = useSelector((state: State) => state.orders);

  console.log(orders);
  const displayOrders = (orders: Array<Order>) => {
    return orders.map((order) => (
      <div className="order" key={order.id}>
        <div className="titles">
          <span className="place">{order.place}</span>
          <span>{moment(order.createdAt).fromNow()}</span>
        </div>
        <ul className="items">
          {order.orderItems.map((orderItem, index) => (
            <li key={index}>{orderItem.item.name}</li>
          ))}
        </ul>
        <FontAwesome name="arrow-right" className="next" onClick={() => upgradeOrder(order)} />
      </div>
    ));
  };

  return (
    <>
      <Navbar back="/" />
      <div id="preparation">
        <div className="status pending">
          <span className="title">En attente</span>
          <div className="orders">{displayOrders(orders.filter((order) => order.status === Status.PENDING))}</div>
        </div>
        <div className="status preparing">
          <span className="title">Préparation</span>
          <div className="orders">{displayOrders(orders.filter((order) => order.status === Status.PREPARING))}</div>
        </div>
        <div className="status ready">
          <span className="title">Prêt</span>
          <div className="orders">{displayOrders(orders.filter((order) => order.status === Status.READY))}</div>
        </div>
      </div>
    </>
  );
};

export default Preparation;
