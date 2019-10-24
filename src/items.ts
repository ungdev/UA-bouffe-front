interface Item {
  key: string,
  name: string,
  price: number,
  orgaPrice: number,
  category: string,
  noPrep: boolean
}

const boissonCanette : Item = {
  key        : 'boisson-canette',
  name      : 'Boisson Canette',
  price     : 100,
  orgaPrice: 60,
  category  : 'canettes',
  noPrep    : true
};

const coca : Item = {
  key        : 'coca-cola',
  name      : 'Coca Cola',
  price     : 100,
  orgaPrice: 60,
  category  : 'canettes',
  noPrep    : true
};

export default [
  {
    category: 'canettes',
    items: [boissonCanette, coca]
  }
]