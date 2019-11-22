import { setOrders } from '../reducers/orders';
import { Dispatch, GetState, Identifiable } from '../types';
import { getOrders } from './orders';
import { getCategories } from './categories';
import { setCategories } from '../reducers/categories';

const arraysDifferent = (oldArray: Array<Identifiable>, newArray: Array<Identifiable>) => {
  if (oldArray.length !== newArray.length) return true;

  return newArray.some((item, index) => item.id !== oldArray[index].id);
};

let orderInterval: NodeJS.Timer = null;
let categoryInterval: NodeJS.Timer = null;
export const Interval = {
  start: () => async (dispatch: Dispatch, getState: GetState) => {
    orderInterval = setInterval(async () => {
      const orders = await getOrders();
      const previousOrders = getState().orders;

      // Refreshes only if arrays are differents
      if (arraysDifferent(previousOrders, orders)) {
        dispatch(setOrders(orders));
      }
    }, parseInt(process.env.REACT_APP_ORDER_INTERVAL) || 1000);

    categoryInterval = setInterval(async () => {
      const categories = await getCategories();
      const previousCategories = getState().categories;
      if (arraysDifferent(previousCategories, categories)) {
        dispatch(setCategories(categories));
      }
    }, parseInt(process.env.REACT_APP_CATEGORY_INTERVAL) || 5000);
  },
  stop: () => {
    if (orderInterval) {
      clearInterval(orderInterval);
    }

    if (categoryInterval) {
      clearInterval(categoryInterval);
    }
  },
};
