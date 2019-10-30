import React from 'react';

import './preparation.scss';
import Navbar from '../components/navbar';
import FontAwesome from 'react-fontawesome';
import { useSelector } from 'react-redux';
import { State } from '../reducers';
import { Order as OrderType } from './tv';

const Order = ({ order }: { order: OrderType }) => {
  return (
    <div className="order">
      <div>#{order.id}</div>
      <ul>
        <li>1 crocs</li>
        <li>1 pizza</li>
      </ul>
      <FontAwesome name="arrow-right" className="next" />
    </div>
  );
};

const Preparation = () => {
  const orders = useSelector((state: State) => state.orders);
  const status = ['pending', 'preparing', 'ready', 'finished'];
  return (
    <>
      <Navbar back="/" />
      <div id="preparation">
        <div className="status pending">
          <span className="title">En attente</span>
          <div className="orders">
            {orders.map((order, index) => (
              <Order order={order} key={index} />
            ))}
          </div>
        </div>
        <div className="status preparing">
          <span className="title">Préparation</span>
        </div>
        <div className="status ready">
          <span className="title">Prêt</span>
        </div>
      </div>
    </>
  );
};

export default Preparation;
