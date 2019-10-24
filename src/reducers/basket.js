const initialState = [];

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CLEAR_BASKET = 'CLEAR_BASKET';

export default (state = initialState, action) => {

  switch (action.type) {

    case ADD_ITEM:
      return state.concat([ action.payload ]);

    case REMOVE_ITEM:
      return state.filter((item, i) => i !== action.payload);

    case CLEAR_BASKET:
      return [];

    default:
      return state;
  }
};