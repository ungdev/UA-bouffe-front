import { Action } from ".";

const initialState = false;

export const TOOGLE_ORGA_PRICE = 'TOOGLE_ORGA_PRICE';
export const SET_NORMAL_PRICE = 'SET_NORMAL_PRICE';

export default (state = initialState, action: Action) => {

  switch (action.type) {
    case TOOGLE_ORGA_PRICE:
      return !state;

    case SET_NORMAL_PRICE:
      return false;

    default:
      return false;
  }
};

export const toogleOrgaPrice = () => ({
    type: TOOGLE_ORGA_PRICE,
});

export const setNormalPrice = () => ({
    type: SET_NORMAL_PRICE,
});