import { Action } from '.';

const initialState = null;

const SET_HISTORY = 'SET_HISTORY';

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_HISTORY:
      return action.payload;

    default:
      return state;
  }
};

export const setHistory = (history: any) => ({
  type: SET_HISTORY,
  payload: history,
});
