import { Category, Action } from '../types';

const initialState = [] as Array<Category>;

const SET_CATEGORIES = 'SET_CATEGORIES';
const CLEAR_CATEGORIES = 'CLEAR_CATEGORIES';
const TOOGLE_ITEM_AVAILABLE = 'TOOGLE_ITEM_AVAILABLE';

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.payload;

    case TOOGLE_ITEM_AVAILABLE:
      const categoryFound = state.find((category) => category.items.some((item) => item.id === action.payload));
      return state.map((category) => {
        if (category.id !== categoryFound.id) return category;
        else {
          return {
            ...category,
            items: category.items.map((item) => {
              if (item.id !== action.payload) {
                return item;
              } else {
                return {
                  ...item,
                  available: !item.available,
                };
              }
            }),
          };
        }
      });

    case CLEAR_CATEGORIES:
      return [];
  }

  return state;
};

export const toogleItemAvailable = (id: number): Action => {
  return {
    type: TOOGLE_ITEM_AVAILABLE,
    payload: id,
  };
};

export const setCategories = (categories: Array<Category>): Action => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const clearCategories = (): Action => ({
  type: CLEAR_CATEGORIES,
});
