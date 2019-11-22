import { setOrders } from '../reducers/orders';
import { Dispatch } from '../types';
import { getOrders } from './orders';
import { getCategories } from './categories';
import { setCategories } from '../reducers/categories';

let orderInterval: NodeJS.Timer = null;
let categoryInterval: NodeJS.Timer = null;
export const Interval = {
  start: () => async (dispatch: Dispatch) => {
    orderInterval = setInterval(async () => {
      const orders = await getOrders();
      dispatch(setOrders(orders));
    }, parseInt(process.env.REACT_APP_ORDER_INTERVAL) || 1000);

    categoryInterval = setInterval(async () => {
      const categories = await getCategories();
      dispatch(setCategories(categories));
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
