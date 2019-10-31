import io from 'socket.io-client';
import { Item } from '../categories';
import { PaymentMethod } from '../components/basket';
import { Order } from '../routes/tv';
import { setOrders } from '../reducers/orders';
import { toast } from 'react-toastify';

let socket = null as any;

export const Socket = {
  connect: () => (dispatch: any) => {
    socket = io.connect(process.env.REACT_APP_API_URI as string);
    socket.emit('refreshOrders');

    socket.on('ordersUpdate', (orders: Array<Order>) => {
      dispatch(setOrders(orders));
    });
  },

  checkConnect: () => {
    if (socket) return true;
    else {
      toast.error('Non connecté au serveur');
      return false;
    }
  },

  disconnect: () => {
    if (socket !== null) socket.disconnect();
    socket = null;
  },

  newOrder: (name: string, _items: Array<Item>, method: PaymentMethod, orgaPrice: boolean) => {
    if (Socket.checkConnect()) {
      const items = _items.map((item) => ({
        name: item.name,
        key: item.key,
        category: item.category,
        price: orgaPrice ? item.orgaPrice : item.price,
      }));
      socket.emit('newOrder', { name, items, method });
    }
  },
};

export default socket;
