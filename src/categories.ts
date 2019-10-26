export interface Item {
  key: string;
  name: string;
  price: number;
  orgaPrice: number;
  category: string;
}

export interface Category {
  name: string;
  items: Array<Item>;
}

const coca = {
  key: 'coca-cola',
  name: 'Coca Cola',
  price: 100,
  orgaPrice: 60,
  category: 'canettes',
  noPrep: true,
};

const sprite = {
  key: 'sprite',
  name: 'Sprite',
  price: 100,
  orgaPrice: 60,
  category: 'canettes',
  noPrep: true,
};

const cocaCherry = {
  key: 'coca-cherry',
  name: 'Coca Cherry',
  price: 100,
  orgaPrice: 60,
  category: 'canettes',
  noPrep: true,
};

const cocaZero = {
  key: 'coca-zero',
  name: 'Coca Zéro',
  price: 100,
  orgaPrice: 60,
  category: 'canettes',
  noPrep: true,
};

const orangina = {
  key: 'orangina',
  name: 'Orangina',
  price: 100,
  orgaPrice: 60,
  category: 'canettes',
  noPrep: true,
};

const schweppesAgrum = {
  key: 'schweppes-agrum',
  name: 'Schweppes Agrum',
  price: 100,
  orgaPrice: 60,
  category: 'canettes',
  noPrep: true,
};

const iceTea = {
  key: 'ice-tea',
  name: 'Ice Tea',
  price: 100,
  orgaPrice: 60,
  category: 'canettes',
  noPrep: true,
};

const fantaOrange = {
  key: 'fanta-orange',
  name: 'Fanta Orange',
  price: 100,
  orgaPrice: 60,
  category: 'canettes',
  noPrep: true,
};

const oasisOrange = {
  key: 'oasis-orange',
  name: 'Oasis Orange',
  price: 100,
  orgaPrice: 60,
  category: 'canettes',
  noPrep: true,
};

const oasisTropical = {
  key: 'oasis-tropical',
  name: 'Oasis Tropical',
  price: 100,
  orgaPrice: 60,
  category: 'canettes',
  noPrep: true,
};

const boissonEau = {
  key: 'boisson-eau',
  name: 'Eau',
  price: 60,
  orgaPrice: 50,
  category: 'canettes',
  noPrep: true,
};

const boissonMonsterEnergy = {
  key: 'boisson-monster-energy',
  name: 'Monster Energy',
  price: 250,
  orgaPrice: 200,
  category: 'canettes',
  noPrep: true,
};

const boissonMonsterUltra = {
  key: 'boisson-monster-ultra',
  name: 'Monster Ultra',
  price: 250,
  orgaPrice: 200,
  category: 'canettes',
  noPrep: true,
};

const briqueJus = {
  key: 'brique-jus',
  name: 'Brique de jus',
  price: 70,
  orgaPrice: 40,
  category: 'canettes',
  noPrep: true,
};

/* Snack */

const snackBounty = {
  key: 'snack-bounty',
  name: 'Bounty',
  price: 100,
  orgaPrice: 70,
  category: 'snacks',
  noPrep: true,
};

const snackSnickers = {
  key: 'snack-snickers',
  name: 'Snickers',
  price: 100,
  orgaPrice: 70,
  category: 'snacks',
  noPrep: true,
};

const snackKinderBueno = {
  key: 'snack-kinder-bueno',
  name: 'Kinder Bueno',
  price: 100,
  orgaPrice: 70,
  category: 'snacks',
  noPrep: true,
};

const snackKitKat = {
  key: 'snack-kit-kat',
  name: 'Kit Kat',
  price: 100,
  orgaPrice: 70,
  category: 'snacks',
  noPrep: true,
};

const snackTwix = {
  key: 'snack-twix',
  name: 'Twix',
  price: 100,
  orgaPrice: 70,
  category: 'snacks',
  noPrep: true,
};

const snackMaltesers = {
  key: 'snack-maltesers',
  name: 'Maltesers',
  price: 100,
  orgaPrice: 70,
  category: 'snacks',
  noPrep: true,
};

const snackCompote = {
  key: 'snack-compote',
  name: "Pom'potes",
  price: 60,
  orgaPrice: 50,
  category: 'snacks',
  noPrep: true,
};

const snackBonbon = {
  key: 'snack-bonbon',
  name: 'Bonbons',
  price: 70,
  orgaPrice: 70,
  category: 'snacks',
  noPrep: true,
};

const snackChips = {
  key: 'snack-chips',
  name: 'Chips',
  price: 60,
  orgaPrice: 30,
  category: 'snacks',
  noPrep: true,
};

const snackSaucisson = {
  key: 'snack-saucisson',
  name: 'Saucisson',
  price: 150,
  orgaPrice: 0,
  category: 'snacks',
  noPrep: true,
};

/* Crêpes Salées */

const crepeJambonFromage = {
  key: 'crepe-jambon-fromage',
  name: 'Crêpe Jambon Fromage',
  price: 150,
  orgaPrice: 100,
  category: 'crepes',
};

const crepeComplete = {
  key: 'crepe-complete',
  name: 'Crêpe Complète',
  price: 200,
  orgaPrice: 150,
  category: 'crepes',
};

const supplementLegume = {
  key: 'supplement-legume',
  name: 'Suppléments Légumes',
  price: 15,
  orgaPrice: 15,
  category: 'crepes',
};

const crepeChevreMiel = {
  key: 'crepe-chevre-miel',
  name: 'Crêpe Chèvre Miel',
  price: 150,
  orgaPrice: 100,
  category: 'crepes',
};

/* Croques-Monsieur */

const croqueJambonFromage = {
  key: 'croque-jambon-fromage',
  name: 'Croque Jambon Fromage',
  price: 100,
  orgaPrice: 100,
  category: 'croques',
};

const croqueChevreMiel = {
  key: 'croque-chevre-miel',
  name: 'Croque Chèvre Miel',
  price: 100,
  orgaPrice: 100,
  category: 'croques',
};

const croqueTroisFromage = {
  key: 'croque-trois-fromage',
  name: 'Croque 3 Fromage',
  price: 100,
  orgaPrice: 100,
  category: 'croques',
};

/* Pizza */

const pizzaJambonEmmental = {
  key: 'pizza-jambon-emmental',
  name: 'Pizza Chèvre Mazdam',
  price: 450,
  orgaPrice: 350,
  category: 'pizzas',
};

const pizzaChorizo = {
  key: 'pizza-chorizo',
  name: 'Pizza 4 Fromages',
  price: 450,
  orgaPrice: 350,
  category: 'pizzas',
};

const pizzaChevreLardons = {
  key: 'pizza-chevre-lardons',
  name: 'Pizza Chèvre Lardons',
  price: 450,
  orgaPrice: 350,
  category: 'pizzas',
};

const pizzaRoyale = {
  key: 'pizza-royale',
  name: 'Pizza Royale',
  price: 450,
  orgaPrice: 350,
  category: 'pizzas',
};

/* Sandwichs */
/*
const sandwichThon = {
  key        : 'sandwich-thon-mayonnaise',
  name      : 'Thon Mayonnaise',
  price     : 250,
  orgaPrice: 200,
  category  : 'sandwichs'
};

 const sandwichJambonBeurre = {
  key        : 'sandwich-jambon-beurre',
  name      : 'Jambon Beurre',
  price     : 250,
  orgaPrice: 200,
  category  : 'sandwichs'
};

const sandwichTzatziki = {
  key        : 'sandwich-tzatziki',
  name      : 'Sandwich Tzatziki',
  price     : 250,
  orgaPrice: 200,
  category  : 'sandwichs'
};

/* Boissons Chaudes */
/*
const boissonCafe = {
  key        : 'boisson-cafe',
  name      : 'Café',
  price     : 50,
  orgaPrice: 0,
  category  : 'canettes',
  noPrep    : true
};

 const boissonThe = {
  key        : 'boisson-the',
  name      : 'Thé',
  price     : 50,
  orgaPrice: 0,
  category  : 'canettes',
  noPrep    : true
};

 const boissonChocolat = {
  key        : 'boisson-chocolat',
  name      : 'Chocolat',
  price     : 100,
  orgaPrice: 70,
  category  : 'canettes',
  noPrep    : true
};

/* Nourriture Sucrée */

const crepeNutella = {
  key: 'crepe-nutella',
  name: 'Crêpe Nutella',
  price: 50,
  orgaPrice: 50,
  category: 'crepes',
};
const crepeSucre = {
  key: 'crepe-sucre',
  name: 'Crêpe au Sucre',
  price: 50,
  orgaPrice: 50,
  category: 'crepes',
};
const crepeFraise = {
  key: 'crepe-fraise',
  name: 'Crêpe Confiture Fraise',
  price: 50,
  orgaPrice: 50,
  category: 'crepes',
};
const crepeAbricot = {
  key: 'crepe-abricot',
  name: 'Crêpe Confiture Abricot',
  price: 50,
  orgaPrice: 50,
  category: 'crepes',
};
const crepeMiel = {
  key: 'crepe-miel',
  name: 'Crêpe Miel',
  price: 50,
  orgaPrice: 50,
  category: 'crepes',
};
const croqueNutella = {
  key: 'croque-nutella',
  name: 'Croque Nutella',
  price: 100,
  orgaPrice: 50,
  category: 'croques',
};

const tartineNutella = {
  key: 'tartine-nutella',
  name: 'Tartine Nutella',
  price: 100,
  orgaPrice: 50,
  category: 'snacks',
};

const tartineFraise = {
  key: 'tartine-fraise',
  name: 'Tartine Confiture Fraise',
  price: 100,
  orgaPrice: 50,
  category: 'snacks',
};

const tartineAbricot = {
  key: 'tartine-abricot',
  name: 'Tartine Confiture Abricot',
  price: 100,
  orgaPrice: 50,
  category: 'snacks',
};

const tartineMiel = {
  key: 'tartine-miel',
  name: 'Tartine Miel',
  price: 100,
  orgaPrice: 50,
  category: 'snacks',
};

/* Goodies */

const tshirtUA = {
  key: 'tshirt-UA',
  name: 'TshirtUA',
  price: 1500,
  orgaPrice: 1000,
  category: 'goodies',
  noPrep: true,
};

const pins = {
  key: 'pins',
  name: 'Pins',
  price: 100,
  orgaPrice: 100,
  category: 'goodies',
  noPrep: true,
};

const cableSeptMetres = {
  key: 'cable-sept-metres',
  name: 'Câble Ethernet (7m)',
  price: 700,
  orgaPrice: 700,
  category: 'goodies',
  noPrep: true,
};

const cableCinqMetres = {
  key: 'cable-cinq-metres',
  name: 'Câble Ethernet (5m)',
  price: 500,
  orgaPrice: 500,
  category: 'goodies',
  noPrep: true,
};

const multiprise = {
  key: 'multiprise',
  name: 'Multiprise',
  price: 500,
  orgaPrice: 500,
  category: 'goodies',
  noPrep: true,
};

const items: Array<Category> = [
  coca,
  sprite,
  cocaCherry,
  cocaZero,
  orangina,
  schweppesAgrum,
  iceTea,
  fantaOrange,
  oasisOrange,
  oasisTropical,
  boissonEau,
  boissonMonsterEnergy,
  boissonMonsterUltra,
  briqueJus,
  snackBounty,
  snackSnickers,
  snackKinderBueno,
  snackKitKat,
  snackTwix,
  snackMaltesers,
  snackCompote,
  snackBonbon,
  snackChips,
  snackSaucisson,
  crepeJambonFromage,
  crepeComplete,
  supplementLegume,
  crepeChevreMiel,
  croqueJambonFromage,
  croqueChevreMiel,
  croqueTroisFromage,
  pizzaJambonEmmental,
  pizzaChorizo,
  pizzaChevreLardons,
  pizzaRoyale,
  crepeSucre,
  crepeNutella,
  crepeFraise,
  crepeAbricot,
  crepeMiel,
  croqueNutella,
  tartineNutella,
  tartineFraise,
  tartineAbricot,
  tartineMiel,
  tshirtUA,
  pins,
  cableSeptMetres,
  cableCinqMetres,
  multiprise,
].reduce((acc: any, curr: any) => {
  const itemIndex = acc.findIndex((item: Item) => item.name === curr.category);

  if (itemIndex === -1) {
    acc.push({
      name: curr.category,
      items: [curr],
    });
  }
 else {
    acc[itemIndex].items.push(curr);
  }

  return acc;
}, []);
export default items;
