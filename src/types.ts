// General
export interface Item {
  key: string;
  name: string;
  price: number;
  orgaPrice: number;
  category: string;
  isAvailable: boolean;
}

export interface Category {
  name: string;
  items: Array<Item>;
}

export enum Status {
  PENDING = 'pending',
  PREPARING = 'preparing',
  READY = 'ready',
  FINISHED = 'finished',
}

export interface OrderItem {
  id: number;
  name: string;
  key: string;
  category: string;
}

export interface Order {
  id: number;
  method: PaymentMethod;
  status: Status;
  orderItems: Array<OrderItem>;
}

export enum PaymentMethod {
  Card = 'card',
  Cash = 'cash',
}

// Redux
export interface State {
  basket: Array<Item>;
  orgaPrice: boolean;
  orders: Array<Order>;
  login: LoginState;
}

export interface Action {
  type: string;
  payload: any;
}

export interface LoginState {
  token: string;
  loading: boolean;
}