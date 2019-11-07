import { Category, Action } from '../types';

const initialState = [] as Array<Category>;

const SET_CATEGORIES = 'SET_CATEGORIES';
const CLEAR_CATEGORIES = 'CLEAR_CATEGORIES';

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.payload;

    case CLEAR_CATEGORIES:
      return [];
  }

  return state;
};

export const setCategories = (categories: Array<Category>) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const clearCategories = () => ({
  type: CLEAR_CATEGORIES,
});
