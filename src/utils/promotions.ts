import { Item, Promotion, Price } from '../types';

/**
 * Il faut juste bien orderner les promotions du plus complexe au moins complexe
 */
const promotionCatalog: Array<Promotion> = [
  {
    formula: ['pizza', 'canette'],
    orgaPrice: 400,
    price: 500,
    name: 'Promo pizza canette',
    key: 'pizza-canette',
  },
  {
    formula: ['croques', 'croques', 'croques', 'canette'],
    orgaPrice: 250,
    price: 450,
    name: 'Promo 3 croques canette',
    key: 'croques-canettes',
  },
  {
    formula: ['croques', 'croques', 'croques'],
    orgaPrice: 200,
    price: 400,
    name: 'Promo 3 croques',
    key: 'croques',
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arrayContainsArray = (superset: Array<any>, subset: Array<any>) => {
  if (subset.length === 0) {
    return false;
  }
  return subset.every((value) => superset.indexOf(value) >= 0);
};

const removePromo = (_basket: Array<Item>, promotions: Promotion) => {
  const basket = _basket.slice();
  for (const itemPromo of promotions.formula) {
    const i = basket.findIndex((e) => e.promoKey === itemPromo);
    basket.splice(i, 1);
    //basket = basket.filter((e, index) => i !== index);
  }

  return basket;
};

interface FindPromoReturn {
  basket: Array<Item>;
  promotion: Promotion;
}

const findPromo = (basket: Array<Item>, promotions: Array<Promotion>): FindPromoReturn => {
  for (const promotion of promotions) {
    const isPromo = arrayContainsArray(basket.map((item) => item.promoKey), promotion.formula);
    if (isPromo) {
      const newCart = removePromo(basket, promotion);
      return { basket: newCart, promotion };
    }
  }
  return { basket, promotion: null };
};

interface ComputePromotionsReturn {
  promotions: Array<Promotion>;
  itemsLeft: Array<Item>;
  total: number;
}

const calculateTotal = (array: Array<Price>, orgaPrice: boolean) => {
  return array.reduce((acc, curr) => acc + (orgaPrice ? curr.orgaPrice : curr.price), 0);
};

const computePromotions = (_basket: Array<Item>, orgaPrice: boolean): ComputePromotionsReturn => {
  let basket = _basket.slice();
  let hasPromotions = true;
  const listPromotions = [];

  while (hasPromotions) {
    const result = findPromo(basket, promotionCatalog);
    basket = result.basket;
    hasPromotions = !!result.promotion;

    if (result.promotion) {
      listPromotions.push(result.promotion);
    }
  }

  return {
    promotions: listPromotions,
    itemsLeft: basket,
    total: calculateTotal(listPromotions, orgaPrice) + calculateTotal(basket, orgaPrice),
  };
};

export default computePromotions;
