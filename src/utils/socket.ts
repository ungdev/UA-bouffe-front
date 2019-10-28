import io from 'socket.io-client';
import { Item } from '../categories';
import { PaymentMethod } from '../components/basket';
import { Order } from '../routes/tv';

const socket = io.connect(process.env.REACT_APP_API_URI as string);

export const newOrder = (name: string, _items: Array<Item>, method: PaymentMethod, orgaPrice: boolean) => {
  const items = _items.map((item) => ({
    name: item.name,
    key: item.key,
    category: item.category,
    price: orgaPrice ? item.orgaPrice : item.price,
  }));
  socket.emit('newOrder', { name, items, method });
};

export const addOrdersUpdateListener = (callback: (orders: Array<Order>) => void) => {
  socket.on('ordersUpdate', (orders: Array<Order>) => {
    callback(orders);
  });
};

export const refreshOrders = () =>
  new Promise((resolve, reject) => {
    socket.emit('refreshOrders', (orders: Array<Order>) => resolve(orders));
  });

export default socket;
