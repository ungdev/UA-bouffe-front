import { Order, Category } from '../types';

export const soldItems = (orders: Array<Order>) =>
  orders.reduce((acc, curr) => {
    return acc + curr.orderItems.length;
  }, 0);

export const itemsAvailable = (categories: Array<Category>) =>
  categories.reduce((acc, curr) => {
    return acc + curr.items.filter((item) => item.available).length;
  }, 0);
