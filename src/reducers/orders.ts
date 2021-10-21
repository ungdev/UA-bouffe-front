import { Order, Action } from '../types';

const initialState: Array<Order> = [];

const SET_ORDERS = 'SET_ORDERS';
const CLEAR_ORDERS = 'CLEAR_ORDERS';

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.payload;

    case CLEAR_ORDERS:
      return [];
  }

  return state;
};

export const setOrders = (orders: Array<Order>) => ({
  type: SET_ORDERS,
  payload: orders,
});

export const clearOrders = () => ({
  type: CLEAR_ORDERS,
});
