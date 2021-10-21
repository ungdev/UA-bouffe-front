import { Action, ServerState } from '../types';

const initialState: ServerState = {
  socketConnected: false,
};

export const SET_SOCKET_CONNECTED = 'SET_SOCKET_CONNECTED';
export const SET_SOCKET_DISCONNECTED = 'SET_SOCKET_DISCONNECTED';

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_SOCKET_CONNECTED:
      return {
        ...state,
        socketConnected: true,
      };

    case SET_SOCKET_DISCONNECTED:
      return {
        ...state,
        socketConnected: false,
      };

    default:
      return state;
  }
};

export const setSocketConnected = () => ({
  type: SET_SOCKET_CONNECTED,
});

export const setSocketDisconnected = () => ({
  type: SET_SOCKET_DISCONNECTED,
});
