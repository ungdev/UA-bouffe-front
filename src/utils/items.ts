import { API } from './api';
import { getCategories } from './categories';
import { Dispatch } from '../types';
import { setCategories } from '../reducers/categories';

export const toogleItemAvailable = (id: number) => async (dispatch: Dispatch) => {
  await API.patch(`/items/${id}/availability/toogle`, {});
  const categories = await getCategories();
  dispatch(setCategories(categories));
};
