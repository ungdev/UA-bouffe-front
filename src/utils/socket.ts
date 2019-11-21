//import io from 'socket.io-client';
import { setOrders } from '../reducers/orders';
//import { toast } from 'react-toastify';
//import { logout } from '../reducers/login';
import { Dispatch } from '../types';
//import { setCategories } from '../reducers/categories';
//import { useEffect } from 'react';
import { getOrders } from './orders';

//let socket: SocketIOClientStatic['Socket'] | undefined = undefined;

// eslint-disable-next-line
let interval: any = null;
export const Socket = {
  connect: () => async (dispatch: Dispatch) => {
    interval = setInterval(async () => {
      const orders = await getOrders();
      dispatch(setOrders(orders));
    }, parseInt(process.env.REACT_APP_HTTP_REQUEST_INTERVAL));

    //socket = io.connect(process.env.REACT_APP_API_URI);
    /*
    useEffect(() => {
      const interval = setInterval(() => {



      }, 5000);

      return () => clearInterval(interval);
    })*/
    /*
    socket.on('orderUpdate', (orders: Array<Order>) => {
      dispatch(setOrders(orders));
    });

    socket.on('categoryUpdate', (categories: Array<Category>) => {
      dispatch(setCategories(categories));
    });*/
    /*
    socket.on('disconnect', (reason: string) => {
      if (reason === 'transport close') {
        toast.error('Extinction du serveur...');
        dispatch(logout());
      }
    });*/
  },

  checkConnect: () => {
    /*if (socket) return true;
    else {
      toast.error('Non connecté au serveur');
      return false;
    }*/
  },

  disconnect: () => {
    if (interval) {
      clearInterval(interval);
    }

    /*if (socket) socket.disconnect();
    socket = undefined;*/
  },
};
