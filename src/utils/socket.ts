import io from 'socket.io-client';
import { setOrders } from '../reducers/orders';
import { toast } from 'react-toastify';
import { logout } from '../reducers/login';
import { Order, Item, PaymentMethod, Status } from '../types';
import { getOrders } from './orders';

let socket: SocketIOClientStatic['Socket'] | undefined = undefined;

export const Socket = {
  connect: () => async (dispatch: any) => {
    socket = io.connect(process.env.REACT_APP_API_URI);

    const orders = await getOrders();
    dispatch(setOrders(orders));

    socket.on('ordersUpdate', (orders: Array<Order>) => {
      dispatch(setOrders(orders));
    });

    socket.on('disconnect', () => dispatch(logout()));
  },

  checkConnect: () => {
    if (socket) return true;
    else {
      toast.error('Non connecté au serveur');
      return false;
    }
  },

  disconnect: () => {
    if (socket) socket.disconnect();
    socket = undefined;
  },

  addOrder: (name: string, _items: Array<Item>, method: PaymentMethod, orgaPrice: boolean) => {
    if (Socket.checkConnect()) {
      const items = _items.map((item) => ({
        name: item.name,
        key: item.key,
        category: item.category,
        price: orgaPrice ? item.orgaPrice : item.price,
      }));
      socket.emit('addOrder', { name, items, method });
    }
  },

  upgradeOrder: (order: Order) => {
    if (Socket.checkConnect()) {
      const status = [Status.PENDING, Status.PREPARING, Status.READY, Status.FINISHED];
      order.status = status[status.indexOf(order.status) + 1];

      socket.emit('setOrderStatus', order);
    }
  },
};

export default socket;