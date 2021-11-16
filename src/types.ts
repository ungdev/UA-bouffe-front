import { ThunkDispatch } from 'redux-thunk';

// General
export interface Price {
  price: number;
  orgaPrice: number;
}

export interface NamedItem extends Identifiable {
  key: string;
  name: string;
}

export interface IBuyable extends Price, NamedItem {
  promoKey: string;
  available: boolean;
}

export interface Identifiable {
  id: number;
}

export interface Item extends IBuyable {
  supplements: Supplement[];
}

export interface Supplement extends IBuyable {
  applicableOn: Item[];
}

export interface ItemWithCategory extends Item {
  category: Category;
}

export interface Category extends Identifiable {
  name: string;
  key: string;
  items: Array<Item>;
}

export interface OrderItem {
  item: Omit<ItemWithCategory, 'supplements'>;
  supplements: {
    supplement: NamedItem;
  }[];
}

export interface Order {
  id: number;
  place: string;
  method: PaymentMethod;
  status: Status;
  orderItems: Array<OrderItem>;
  createdAt: string;
}

export interface User {
  token: string;
  name: string;
  key: string;
}

export interface Promotion extends Price {
  name: string;
  key: string;
  formula: Array<string>; // array of promo key
  price: number;
  orgaPrice: number;
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
  Ticket = 'ticket',
}

// Redux
export interface State {
  basket: Array<Item>;
  orgaPrice: boolean;
  orders: Array<Order>;
  login: LoginState;
  categories: Array<Category>;
  promotions: Array<Promotion>;
  server: ServerState;
}

export interface Action {
  type: string;
  payload?: any;
}

export type Dispatch = ThunkDispatch<State, void, Action>;
export type GetState = () => State;

export interface LoginState extends User {
  loading: boolean;
  token: string;
  name: string;
  key: string;
}

export interface ServerState {
  socketConnected: boolean;
}
