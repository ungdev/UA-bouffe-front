import { Order, Item, PaymentMethod, Status } from '../types';
import { API } from './api';

export const getOrders = async () => {
  const request = await API.get<Array<Order>>('/orders');
  const orders = request.data;

  return orders;
};

export const addOrder = async (items: Array<Item>, place: string, method: PaymentMethod, orgaPrice: boolean) => {
  const orders = items.map((item) => item.id);

  await API.post('/orders', {
    method,
    place,
    orgaPrice,
    orders,
  });
};

export const upgradeOrder = async (order: Order) => {
  await API.patch(`/orders/${order.id}`, null);
};
