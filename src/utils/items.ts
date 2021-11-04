import { API } from './api';

export const toggleAvailable = async (id: number | string) => {
  await API.patch(`/items/${id}/availability/toggle`, {});
};
