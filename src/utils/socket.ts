import { io, Socket as ClientSocket } from 'socket.io-client';
import { setOrders } from '@/reducers/orders';
import { toast } from 'react-toastify';
import { Category, Dispatch, Order } from '@/types';
import { setCategories } from '@/reducers/categories';
import { setServerOffline, setServerOnline, setSocketConnected, setSocketDisconnected } from '@/reducers/server';

let socket: ClientSocket | undefined = undefined;

export const Socket = {
  connect: () => async (dispatch: Dispatch) => {
    if (!socket) {
      socket = io("http://localhost:3001"); //TODO env

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

      //TODO Appelé à chaque changement de page...
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
