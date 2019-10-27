import { Item } from './categories';

interface Promotion {
  name: string;
  items: Array<Item>;
  price: number;
  orgaPrice: number;
}

const promotions: Array<Promotion> = [
  {
    name: 'Promotion 3 Crocs',
    price: 20000,
    orgaPrice: 15000,
    items: [
      {
        key: 'coca-cola',
        name: 'Coca Cola',
        price: 100,
        orgaPrice: 60,
        category: 'canettes',
        isAvailable: true,
      },
      {
        key: 'sprite',
        name: 'Sprite',
        price: 100,
        orgaPrice: 60,
        category: 'canettes',
        isAvailable: true,
      },
    ],
  },
];

export default promotions;
