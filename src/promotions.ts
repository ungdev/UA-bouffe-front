import { Item } from "./types";

interface Promotion {
  name: string;
  items: Array<Array<Item>>;
  price: number;
  orgaPrice: number;
}

/**
 * LES PROMOTIONS DOIVENT ETRE ORDONEES DU PLUS COMPLIQUE AU MOINS COMPLIQUE
 */
const promotions: Array<Promotion> = [
  {
    name: 'Promotion 3 Crocs',
    price: 20000,
    orgaPrice: 15000,
    items: [
      [
        {
          key: 'coca-cola',
          name: 'Coca Cola',
          price: 100,
          orgaPrice: 60,
          category: 'canettes',
          isAvailable: true,
        },
      ],
      [
        {
          key: 'sprite',
          name: 'Sprite',
          price: 100,
          orgaPrice: 60,
          category: 'canettes',
          isAvailable: true,
        },
      ],
    ],
  },
];

export default promotions;

/**
 *
 * [
 *     [item1 OU item2 OU item3]
 *     ET [item 4 OU item5 OU item6]
 * ]
 *
 * Promo pizza + boisson
 * Pizza [ pizzaRoyale, pizzaChorizo, pizzaChevreLardons, pizzaJambonEmmental ],
 * Boisson [ boissonThe, boissonCafe, boissonChocolat, boissonEau, boissonCanette ]
 *
 * Promo barre + canette
 *  [ twix, bounty, mars ],
    [ caco, sprite, orangina ]

    promo 3 croques

    [ croqueJambonFromage, croqueChevreMiel, croqueTomateMozza ],
    [ croqueJambonFromage, croqueChevreMiel, croqueTomateMozza ],
    [ croqueJambonFromage, croqueChevreMiel, croqueTomateMozza ]

    promo 3 croques + boisson
    [ croqueJambonFromage, croqueChevreMiel, croqueTomateMozza ],
    [ croqueJambonFromage, croqueChevreMiel, croqueTomateMozza ],
    [ croqueJambonFromage, croqueChevreMiel, croqueTomateMozza ],
    [ boissonThe, boissonCafe, boissonChocolat, boissonEau, boissonCanette ]
 */
