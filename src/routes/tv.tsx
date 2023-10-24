import React, { useEffect, useRef, LegacyRef, useState } from 'react';

import './tv.scss';
import { useSelector } from 'react-redux';

import { State, Order as OrderType, Status, OrderItem } from '../types';
import Separator from '../components/UI/separator';
import { useRouter } from 'next/navigation';

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
        {groupedOrderItems.map((item, index) => {
          return (
            <li key={index}>
              {item.count} {formatName(item.name, item.count)}
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
  const router = useRouter();

  const speedDown = 2;
  const speedUp = -5;

  const [scrollSpeed, setScrollSpeed] = useState([speedDown, speedDown, speedDown]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (refs.current !== null) {
      interval = setInterval(() => {
        refs.current.forEach((ref, i) => {
          ref.scrollBy(0, scrollSpeed[i]);
          const { clientHeight, scrollTop, scrollHeight } = ref;
          const _scrollSpeed = scrollSpeed;
          if (clientHeight + scrollTop >= scrollHeight) {
            _scrollSpeed[i] = speedUp;
          } else if (scrollTop === 0) {
            setTimeout(() => {
              _scrollSpeed[i] = speedDown;
            }, 2000);
          }
          setScrollSpeed(_scrollSpeed);
        });
      }, 50);
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  });

  return (
    <div id="tv" onClick={() => router.push('/')}>
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
