import React, { useEffect, useState } from 'react';

import './preparation.scss';
import Navbar from '../components/navbar';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import { useSelector } from 'react-redux';
import { State, Order, Status } from '../types';
import { upgradeOrder as _upgradeOrder } from '../utils/orders';
import { useLocation } from 'react-router';
import { parse } from 'query-string';
import Modal from '../components/modals/modal';
import Loader from '../components/loader';

const Preparation = () => {
  const location = useLocation();
  const queryParams = parse(location.search);
  let orders = useSelector((state: State) => state.orders);

  // Renvoie les commandes contenant au moins un item dans la catégory du paramètre
  if (queryParams.only) {
    orders = orders.filter((order) =>
      order.orderItems.some((orderItem) => orderItem.item.category.key === queryParams.only),
    );
  }

  // used only to refresh the component every minute
  const [tictac, setTicTac] = useState(false);
  const [loading, setLoading] = useState<Order>(null);
  const [confirmOrder, setConfirmOrder] = useState<Order>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicTac(!tictac);
    }, 1000 * 60);

    return () => clearInterval(interval);
  });

  const upgradeOrder = async (order: Order, confirmed = false) => {
    if (order.status === 'ready' && !confirmed) {
      setConfirmOrder(order);
    } else {
      if (!loading) {
        setLoading(order);
        await _upgradeOrder(order);
        setLoading(null);
        setConfirmOrder(null);
      }
    }
  };

  const displayOrders = (orders: Array<Order>) => {
    return orders.map((order) => (
      <div className="order" key={order.id}>
        <div className="titles">
          <span className="place">{order.place}</span>
          <span>{moment(order.createdAt).fromNow(true)}</span>
        </div>
        <ul className="items">
          {order.orderItems.map((orderItem, index) => (
            <li key={index}>{orderItem.item.name}</li>
          ))}
        </ul>
        {loading && loading.id === order.id ? (
          <div className="next">
            <Loader />
          </div>
        ) : (
          <FontAwesome name="arrow-right" className="next" onClick={() => upgradeOrder(order)} />
        )}
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
      <Modal className="preparation-modal" isOpen={!!confirmOrder}>
        <p>La commande {confirmOrder && confirmOrder.place} a-t-elle bien été livrée ?</p>
        <div className="actions">
          <div className="button cancel" onClick={() => setConfirmOrder(null)}>
            {loading ? <Loader /> : 'Annuler'}
          </div>
          <div
            className="button confirm"
            onClick={async () => {
              await upgradeOrder(confirmOrder, true);
              setConfirmOrder(null);
            }}>
            {loading ? <Loader /> : 'Confirmer'}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Preparation;
