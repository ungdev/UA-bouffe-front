import io from 'socket.io-client';
import { setOrders } from '../reducers/orders';
import { toast } from 'react-toastify';
import { logout } from '../reducers/login';
import { Order, Item, PaymentMethod, Status, Category } from '../types';
import { getOrders } from './orders';
import { getCategories } from './categories';
import { setCategories } from '../reducers/categories';

let socket: SocketIOClientStatic['Socket'] | undefined = undefined;

export const Socket = {
  connect: () => async (dispatch: any) => {
    socket = io.connect(process.env.REACT_APP_API_URI);

    const orders = await getOrders();
    dispatch(setOrders(orders));

    socket.on('orderUpdate', (orders: Array<Order>) => {
      dispatch(setOrders(orders));
    });

    const categories = await getCategories();
    dispatch(setCategories(categories));

    socket.on('categoryUpdate', (categories: Array<Category>) => {
      dispatch(setCategories(categories));
    });

    socket.on('disconnect', (reason: string) => {
      if (reason === 'transport close') {
        toast.error('Extinction du serveur...');
        dispatch(logout());
      }
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
    if (socket) socket.disconnect();
    socket = undefined;
  },
};

export default socket;
