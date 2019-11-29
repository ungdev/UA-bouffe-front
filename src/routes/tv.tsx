import React, { useEffect, useRef, LegacyRef } from 'react';

import './tv.scss';
import { useSelector } from 'react-redux';

import { history } from '../components/loginRouter';
import { State, Order as OrderType, Status, OrderItem } from '../types';
import Separator from '../components/UI/separator';

interface GroupedCategory {
  name: string;
  count: number;
}

const groupOrderItems = (items: Array<OrderItem>) => {
  return items.reduce((acc: Array<GroupedCategory>, curr) => {
    const categoryIndex = acc.findIndex((groupedCategory) => groupedCategory.name === curr.item.category.name);

    if (categoryIndex !== -1) {
      acc[categoryIndex].count += 1;
    } else {
      acc.push({
        name: curr.item.category.name,
        count: 1,
      });
    }

    return acc;
  }, []);
};

// Takes plural in account
const formatName = (name: string, count: number) => {
  if (name.endsWith('s') && count === 1) return name.slice(0, -1);

  return name;
};

const Order = ({ order }: { order: OrderType }) => {
  const groupedOrderItems = groupOrderItems(order.orderItems);
  return (
    <div className="card">
      <span className="title">{order.place}</span>
      <ul className="items">
        {groupedOrderItems.map((category, index) => {
          return (
            <li key={index}>
              {category.count} {formatName(category.name, category.count)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const OrderGrid = ({ orders, passingRef }: { orders: Array<OrderType>; passingRef: LegacyRef<HTMLDivElement> }) => {
  return (
    <div className="container" ref={passingRef}>
      <div className="cards">
        {orders.map((order, index) => (
          <Order key={index} order={order} />
        ))}
      </div>
    </div>
  );
};

const Tv = () => {
  const orders = useSelector((state: State) => state.orders);

  const pendingOrders = orders.filter((order) => order.status === Status.PENDING);
  const preparingOrders = orders.filter((order) => order.status === Status.PREPARING);
  const readyOrders = orders.filter((order) => order.status === Status.READY);

  const refs = useRef<HTMLDivElement[]>([null, null, null]);
  useEffect(() => {
    // Hides scrollbars
    if (refs.current !== null) {
      refs.current.forEach((ref) => {
        //ref.style.overflow = 'hidden';

        const interval = setInterval(() => {
          ref.scrollBy(0, 1);
          const { clientHeight, scrollTop, scrollHeight } = ref;
          if (clientHeight + scrollTop >= scrollHeight) {
            ref.scrollTo(0, 0);
          }
        }, 50);

        return () => {
          clearInterval(interval);
          ref.style.overflow = 'visible';
        };
      });
    }
  });

  return (
    <div id="tv" onClick={() => history.push('/')}>
      <div className="orders">
        <div className="title">En attente</div>
        <OrderGrid orders={pendingOrders} passingRef={(el) => (refs.current[0] = el)} />
      </div>
      <Separator />
      <div className="orders">
        <div className="title">Préparation</div>
        <OrderGrid orders={preparingOrders} passingRef={(el) => (refs.current[1] = el)} />
      </div>
      <Separator />
      <div className="orders">
        <div className="title">Prêt</div>
        {<OrderGrid orders={readyOrders} passingRef={(el) => (refs.current[2] = el)} />}
      </div>
    </div>
  );
};

export default Tv;
