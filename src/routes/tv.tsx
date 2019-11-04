import React from 'react';

import './tv.scss';
import { useSelector } from 'react-redux';

import { history } from '../components/loginRouter';
import { Status, State, Order as OrderType, PaymentMethod } from '../types';
import FontAwesome from 'react-fontawesome';

// todo: gerer ça un peu mieux...
const icons = {
  canettes: 'mug-hot',
  snacks: 'candy-cane',
  crepes: 'stroopwafel',
  croques: 'hamburger',
  pizza: 'pizza-slice',
  goodies: 'gifts',
};

const Order = ({ order }: { order: OrderType }) => {
  return (
    <div className="order">
      <span>{order.id} - <FontAwesome name={order.method === PaymentMethod.Card ? 'credit-card' : 'coins'} /></span>
      <div className="items">
        {
          order.orderItems.map((item) => {
            // @ts-ignore
            return <FontAwesome key={item.id} name={icons[item.category]} />;
          })
        }
      </div>
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
