import React, { useState } from 'react';

import './items.scss';
import Navbar from '../components/navbar';
import Switch from '../components/switch';
import { useSelector } from 'react-redux';
import { State, Item as ItemType, Category as CategoryType } from '../types';
import FontAwesome from 'react-fontawesome';
import { formatPrice } from '../utils/format';
import { toogleItemAvailable } from '../utils/items';
import { soldItems, itemsAvailable } from '../utils/stats';

const Item = ({ item }: { item: ItemType }) => {
  return (
    <div className="item" onClick={() => toogleItemAvailable(item.id)}>
      <div className="left-side">
        <Switch on={item.available} />
        <span>{item.name}</span>
      </div>
      <div>
        {formatPrice(item.orgaPrice)} - {formatPrice(item.price)}
      </div>
    </div>
  );
};

const Category = ({ category }: { category: CategoryType }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="category">
      <div className="title" onClick={() => setOpen(!isOpen)}>
        <FontAwesome name={`chevron-right ${isOpen ? 'open' : ''}`} className="icon" />
        {category.name}
      </div>
      {isOpen && (
        <div className="items">
          {category.items.map((item, itemIndex) => (
            <Item item={item} key={itemIndex} />
          ))}
        </div>
      )}
    </div>
  );
};

const Items = () => {
  const categories = useSelector((state: State) => state.categories);
  const orders = useSelector((state: State) => state.orders);

  return (
    <>
      <Navbar back="/" />
      <div id="items">
        <div className="stats">
          <span>Items vendus : {soldItems(orders)}</span>
          <span>Items en vente : {itemsAvailable(categories)}</span>
        </div>
        <div className="categories">
          {categories.map((category, categoryIndex) => (
            <Category category={category} key={categoryIndex} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Items;
