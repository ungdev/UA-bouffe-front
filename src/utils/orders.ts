import { Order, Item, PaymentMethod, Status } from "../types";
import { API } from "./api";

export const getOrders = async () => {
  const request = await API.get<Array<Order>>('/orders');
  const orders = request.data;

  return orders;
};

export const addOrder = async (_items: Array<Item>, method: PaymentMethod, orgaPrice: boolean) => {
  const items = _items.map((item) => ({
    name: item.name,
    key: item.key,
    category: item.category,
    price: orgaPrice ? item.orgaPrice : item.price,
  }));

  await API.post('/orders', {
    method, items,
  });
};

export const upgradeOrder = async (order: Order) => {
  const statusOrdered = [Status.PENDING, Status.PREPARING, Status.READY, Status.FINISHED];
  const newStatus = statusOrdered[statusOrdered.indexOf(order.status) + 1];

  await API.patch(`/orders/${order.id}`, { status: newStatus });
};
