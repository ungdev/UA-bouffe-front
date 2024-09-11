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
    const categoriesToDisplay = searchParams.get("only").split(",");
    orders = orders.filter((order) =>
      order.orderItems.some((orderItem) => categoriesToDisplay.includes(orderItem.item.category.key))
    );
    if (searchParams.has("by") && searchParams.get("by") == "item") {
      orders.forEach((order) => {
        order.orderItems = order.orderItems.filter((orderItem) => categoriesToDisplay.includes(orderItem.item.category.key));
      });
    }
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

  const separate_by: string = searchParams.get('by') ?? 'order';

  const displayOrders = (orders: Array<Order>) => {

    const tenMinutesAgo: moment.Moment = moment().subtract(1, 'minutes');
    const twentyMinutesAgo: moment.Moment = moment().subtract(20, 'minutes');

    type itemQuantity = {
      id: number,
      name: string,
      quantity: number,
    }
  
    const items: Array<itemQuantity> = [];
  
    if (separate_by === 'item') {
      orders.forEach((order) => {
        order.orderItems.forEach(orderItem => {
          const itemId: number = orderItem.item.id;
          const itemName: string = orderItem.item.name
          if (items.some(item => item.id === itemId)) {
            items.find(item => item.id === itemId).quantity ++;
          } else {
            const item: itemQuantity = {
              id: itemId,
              name: itemName,
              quantity: 1
            };
            items.push(item);
          }
        })
      });
    }

    return (
      <div className="orders">
        {separate_by === 'order' && orders.map((order) => (
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
              <div className={`next ${downgradeMode ? "downgrade" : (order.status === Status.READY ? "disabled" : "")}`} onClick={() => editOrder(order)}>
                <FontAwesome name="arrow-right" />
              </div>
            )}
          </div>
        ))}
        {separate_by === 'item' && items.map((item) => (
          <div className="order" key={item.id}>
            <div className="titles">
              <span className="quantity">x {item.quantity}</span>
            </div>
            <ul className="items">
                {item.name}
            </ul>
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
          {!downgradeMode ? "Aller en arrière" : "Aller en avant"}
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
