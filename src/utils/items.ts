import { API } from './api';

export const toggleAvailable = async (id: number | string) => {
  await API.patch(`/items/${id}/availability/toggle`, {});
};

export const RemoveStock = async (id: number | string) => {
  await API.patch(`/items/${id}/RemoveStock`, {});
};
