import { Socket as ClientSocket, connect, io } from 'socket.io-client';
import { setOrders } from '../reducers/orders';
import { toast } from 'react-toastify';
import { Order, Category, Dispatch } from '../types';
import { setCategories } from '../reducers/categories';
import { setSocketDisconnected, setSocketConnected, setServerOnline, setServerOffline } from '../reducers/server';

let socket: ClientSocket | undefined = undefined;

export const Socket = {
  connect: () => async (dispatch: Dispatch) => {
    if (!socket) {
      socket = io(process.env.REACT_APP_API_URI);

      socket.on('connect', () => dispatch(setSocketConnected()));

      socket.on('orderUpdate', (orders: Array<Order>) => {
        dispatch(setOrders(orders));
      });

      socket.on('categoryUpdate', (categories: Array<Category>) => {
        dispatch(setCategories(categories));
      });

      socket.on('networkStatus', ({ online }) => {
        dispatch(online ? setServerOnline() : setServerOffline());
        if (!online) {
          toast.warning("Turbobouffe a été deconnecté d'internet. Passage en mode hors ligne", { autoClose: false });
        } else {
          toast.info('Turbobouff est de nouveau en ligne !', { autoClose: false });
        }
      });

      socket.on('disconnect', (reason: string) => {
        if (reason === 'transport close' || reason === 'ping timeout') {
          toast.error('Extinction du serveur...');

          // Deco reco tmtc ^^
          dispatch(Socket.disconnect());
          dispatch(Socket.connect());
        }
      });
    }
  },

  checkConnect: () => {
    if (socket) return true;
    else {
      toast.error('Non connecté au serveur');
      return false;
    }
  },

  disconnect: () => (dispatch: Dispatch) => {
    if (socket) socket.disconnect();
    socket = undefined;
    dispatch(setSocketDisconnected());
  },
};

export default socket;
