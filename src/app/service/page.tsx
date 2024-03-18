"use client";
import React, { useEffect, useState } from "react";
import "../page.scss";
import "./page.scss";
import Navbar from "../../components/navbar";
import moment from "moment";
import FontAwesome from "react-fontawesome";
import { useSelector } from "react-redux";
import { Order, State, Status } from "@/types";
import { downgradeOrder, upgradeOrder } from "@/utils/orders";
import Modal from "../../components/modals/modal";
import Loader from "../../components/loader";
import Separator from "../../components/UI/separator";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  let orders = useSelector((state: State) => state.orders);

  // Renvoie les commandes contenant au moins un item dans la catégory du paramètre
  if (searchParams.has("only")) {
    orders = orders.filter((order) =>
      order.orderItems.some((orderItem) => orderItem.item.category.key == searchParams.get("only"))
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
        } catch (e) {
        }
        setLoading(null);
        setConfirmOrder(null);
      }
    }
  };

  const displayOrders = (orders: Array<Order>) => {

    const tenMinutesAgo: moment.Moment = moment().subtract(10, 'minutes');
    const twentyMinutesAgo: moment.Moment = moment().subtract(20, 'minutes');

    return (
      <div className="orders service">
        {orders.map((order) => (
          <div className={`order ${moment(order.createdAt).isAfter(twentyMinutesAgo) ? (moment(order.createdAt).isAfter(tenMinutesAgo) ? "" : "timewarning orange") : "timewarning red"}`} key={order.id}>
            <div className="titles">
              <span className="place">{order.place}</span>
              <span>{moment(order.createdAt).fromNow(true)}</span>
            </div>
            <ul className="items">
              {order.orderItems.map((orderItem, index) => (
                <li key={index}>
                  {orderItem.item.name}
                  <div className="options">
                    {orderItem.supplements.map((orderSuppl) => orderSuppl.supplement.name).join(", ")}
                  </div>
                </li>
              ))}
            </ul>
            {loading && loading.id === order.id ? (
              <div className="next">
                <Loader />
              </div>
            ) : (
              <div className={`next ${downgradeMode ? "downgrade" : ""}`} onClick={() => editOrder(order)}>
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
          className={`preparation-mode-button ${downgradeMode ? "downgrade" : ""}`}>
          {!downgradeMode ? "Retour cuisine" : "Servir"}
        </div>
      </Navbar>
      <div id="preparation">
        <div className="status service ready">
          <span className="title">A servir</span>
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
            {loading ? <Loader /> : "Annuler"}
          </div>
          <div
            className="button confirm"
            onClick={async () => {
              await editOrder(confirmOrder, true);
              setConfirmOrder(null);
            }}>
            {loading ? <Loader /> : "Confirmer"}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Page;
