import { Action, Promotion } from '../types';

const initialState: Array<Promotion> = [];

const SET_PROMOTIONS = 'SET_PROMOTIONS';
const CLEAR_PROMOTIONS = 'CLEAR_PROMOTIONS';

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_PROMOTIONS:
      return action.payload;

    case CLEAR_PROMOTIONS:
      return [];
  }

  return state;
};

export const setPromotions = (promotions: Array<Promotion>) => ({
  type: SET_PROMOTIONS,
  payload: promotions,
});

export const clearPromotions = () => ({
  type: CLEAR_PROMOTIONS,
});
