import { Order } from '../routes/tv';
import { Action } from '.';

const initialState = [] as Array<Order>;

const SET_ORDERS = 'SET_ORDERS';

export default (state = initialState, action: Action) => {
  console.log(state, action);
  switch (action.type) {
    case SET_ORDERS:
      return action.payload;
  }

  return state;
};

export const setOrders = (orders: Array<Order>) => ({
  type: SET_ORDERS,
  payload: orders,
});
