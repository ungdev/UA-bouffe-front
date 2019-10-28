import { Item } from '../categories';
import _ from 'lodash';
//import promotions from '../promotions';

const promotion = [['coca-cola', 'sprite'], ['coca-cola', 'sprite']];

/**
 * coca coca
 * sprite sprite
 * coca sprite
 *
 * coca coca
 * coca lite
 * coca sprite
 *
 * sprite sprite
 * sprite lite
 *
 */

const hasPromotion = (promotion: Array<string>, basket: Array<string>) => {
  let counts: any = {};
  promotion.forEach((item) => (counts[item] = (counts[item] || 0) + 1));
  basket.forEach((item) => (counts[item] = (counts[item] || 0) - 1));

  console.log(JSON.stringify(counts));
  return Object.values(counts).every((count: any) => count === 0);
};

const calculatePromotions = (_basket: Array<Item>) => {
  let basket = _basket.map((item) => item.key);

  /*
    0 0 => 1 0
    0 0 => 1 1

    coca-cola coca-cola
  */

  console.log(basket);
};

export default calculatePromotions;
