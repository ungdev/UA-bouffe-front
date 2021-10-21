import { Item, Promotion, Price } from '../types';
import { API } from './api';

export const getPromotions = async () => {
  const request = await API.get<Array<Promotion>>('/promotions');
  const promotions = request.data;

  return promotions;
};

const arrayContainsArray = (superset: Array<any>, subset: Array<any>) => {
  const supersetBis = [...superset];
  if (subset.length === 0) {
    return false;
  }
  if (subset.length > superset.length) {
    return false;
  }
  for (const subItem of subset) {
    const index = supersetBis.indexOf(subItem);
    if (index < 0) {
      return false;
    }
    supersetBis.splice(index, 1);
  }
  return true;
};

const removePromo = (_basket: Array<Item>, promotions: Promotion) => {
  const basket = _basket.slice();
  for (const itemPromo of promotions.formula) {
    const i = basket.findIndex((e) => e.promoKey === itemPromo);
    basket.splice(i, 1);
  }

  return basket;
};

interface FindPromoReturn {
  basket: Array<Item>;
  promotion: Promotion;
}

const findPromo = (basket: Array<Item>, promotions: Array<Promotion>): FindPromoReturn => {
  for (const promotion of promotions) {
    const isPromo = arrayContainsArray(
      basket.map((item) => item.promoKey),
      promotion.formula,
    );
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

const computePromotions = (
  _basket: Array<Item>,
  orgaPrice: boolean,
  promotionCatalog: Array<Promotion>,
): ComputePromotionsReturn => {
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
