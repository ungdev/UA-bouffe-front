import React from 'react';
import { PaymentMethod } from '../components/basket';
import { Item } from '../categories';

export interface Order {
  method: PaymentMethod;
  items: Array<Item>;
}
