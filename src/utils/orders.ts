import { toast } from 'react-toastify';

import { Order, Item, PaymentMethod } from '../types';
import { API } from './api';

export const getOrders = async () => {
  const request = await API.get<Array<Order>>('/orders');
  const orders = request.data;

  return orders;
};

export const addOrder = async (
  items: Array<Item>,
  place: string,
  method: PaymentMethod,
  orgaPrice: boolean,
  total: number,
) => {
  const orders = items.map((item) => item.id);

  await API.post('/orders', {
    method,
    place,
    orgaPrice,
    orders,
    total,
  });

  toast.success('La commande a été envoyée');
};

export const upgradeOrder = async (order: Order) => {
  await API.patch(`/orders/${order.id}/upgrade`, null);
};

export const downgradeOrder = async (order: Order) => {
  await API.patch(`/orders/${order.id}/downgrade`, null);
};
