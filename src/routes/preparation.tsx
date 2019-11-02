import React from 'react';

import './preparation.scss';
import Navbar from '../components/navbar';
import FontAwesome from 'react-fontawesome';
import { useSelector } from 'react-redux';
import { State } from '../reducers';
import { Order, Status } from './tv';
import { Socket } from '../utils/socket';

const Preparation = () => {
  const orders = useSelector((state: State) => state.orders);

  const displayOrders = (orders: Array<Order>) => {
    return orders.map((order) => (
      <div className="order" key={order.id}>
        <div>#{order.id}</div>
        <ul>
          <li>1 crocs</li>
          <li>1 pizza</li>
        </ul>
        <FontAwesome name="arrow-right" className="next" onClick={() => Socket.upgradeOrder(order)} />
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
