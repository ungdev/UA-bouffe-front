import React, { useEffect, useState } from 'react';

import './preparation.scss';
import Navbar from '../components/navbar';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import { useSelector } from 'react-redux';
import { State, Order, Status } from '../types';
import { upgradeOrder, downgradeOrder } from '../utils/orders';
import { useLocation } from 'react-router';
import { parse } from 'query-string';
import Modal from '../components/modals/modal';
import Loader from '../components/loader';
import Separator from '../components/UI/separator';

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
  const [downgradeMode, setDowngradeMode] = useState(false);

  // used only to refresh the component every minute to refresh the duration on the
  useEffect(() => {
    const interval = setInterval(() => {
      setTicTac(!tictac);
    }, 1000 * 60);

    return () => clearInterval(interval);
  });

  const editOrder = async (order: Order, confirmed = false) => {
    // If ready to be confirmed
    if (order.status === Status.READY && !confirmed && !downgradeMode) {
      setConfirmOrder(order);
    }
    // If ready to be cancelled
    else if (order.status === Status.PENDING && !confirmed && downgradeMode) {
      setConfirmOrder(order);
    } else {
      if (!loading) {
        setLoading(order);
        try {
          if (!downgradeMode) {
            await upgradeOrder(order);
          } else {
            setDowngradeMode(false);
            await downgradeOrder(order);
          }
        } catch (e) {}
        setLoading(null);
        setConfirmOrder(null);
      }
    }
  };

  const displayOrders = (orders: Array<Order>) => {
    return (
      <div className="orders">
        {orders.map((order) => (
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
              <div className={`next ${downgradeMode ? 'downgrade' : ''}`} onClick={() => editOrder(order)}>
                <FontAwesome name="arrow-right" />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Navbar back="/">
        <div
          onClick={() => setDowngradeMode(!downgradeMode)}
          className={`preparation-mode-button ${downgradeMode ? 'downgrade' : ''}`}>
          {!downgradeMode ? 'Aller en arrière' : 'Aller en avant'}
        </div>
      </Navbar>
      <div id="preparation">
        <div className="status pending">
          <span className="title">En attente</span>
          {displayOrders(orders.filter((order) => order.status === Status.PENDING))}
        </div>
        <Separator />
        <div className="status preparing">
          <span className="title">Préparation</span>
          {displayOrders(orders.filter((order) => order.status === Status.PREPARING))}
        </div>
        <Separator />
        <div className="status ready">
          <span className="title">Prêt</span>
          {displayOrders(orders.filter((order) => order.status === Status.READY))}
        </div>
      </div>
      <Modal className="preparation-modal" isOpen={!!confirmOrder}>
        {downgradeMode ? (
          <p>Annuler la commande {confirmOrder && confirmOrder.place} ?</p>
        ) : (
          <p>La commande {confirmOrder && confirmOrder.place} a-t-elle bien été livrée ?</p>
        )}
        <div className="actions">
          <div className="button cancel" onClick={() => setConfirmOrder(null)}>
            {loading ? <Loader /> : 'Annuler'}
          </div>
          <div
            className="button confirm"
            onClick={async () => {
              await editOrder(confirmOrder, true);
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
