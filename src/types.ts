// General
export interface Item {
  readonly id: number;
  key: string;
  name: string;
  price: number;
  orgaPrice: number;
  category: string;
  isAvailable: boolean;
}

export interface Category {
  name: string;
  key: string;
  items: Array<Item>;
}

export interface OrderItem {
  item: Item;
  category: Category;
  price: number;
}

export interface Order {
  id: number;
  place: string;
  method: PaymentMethod;
  status: Status;
  orderItems: Array<OrderItem>;
  createdAt: string;
}

export enum Status {
  PENDING = 'pending',
  PREPARING = 'preparing',
  READY = 'ready',
  FINISHED = 'finished',
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
  categories: Array<Category>;
}

export interface Action {
  type: string;
  payload: any;
}

export interface LoginState {
  token: string;
  loading: boolean;
}
