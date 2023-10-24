import { Action, ServerState } from "@/types";

const initialState: ServerState = {
  socketConnected: false,
  internetConnected: false,
};

export const SET_SOCKET_CONNECTED = 'SET_SOCKET_CONNECTED';
export const SET_SOCKET_DISCONNECTED = 'SET_SOCKET_DISCONNECTED';
export const SET_SERVER_ONLINE = 'SET_SERVER_ONLINE';
export const SET_SERVER_OFFLINE = 'SET_SERVER_OFFLINE';

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

    case SET_SERVER_ONLINE:
      return {
        ...state,
        internetConnected: true,
      };

    case SET_SERVER_OFFLINE:
      return {
        ...state,
        internetConnected: false,
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

export const setServerOnline = () => ({
  type: SET_SERVER_ONLINE,
});

export const setServerOffline = () => ({
  type: SET_SERVER_OFFLINE,
});
