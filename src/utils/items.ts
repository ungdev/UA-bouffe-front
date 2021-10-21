import { API } from './api';

export const toogleItemAvailable = async (id: number) => {
  await API.patch(`/items/${id}/availability/toogle`, {});
};
