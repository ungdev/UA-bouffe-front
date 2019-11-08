import React, { useState } from 'react';

import './items.scss';
import Navbar from '../components/navbar';
import Switch from '../components/switch';
import { useSelector, useDispatch } from 'react-redux';
import { State, Item as ItemType, Category as CategoryType } from '../types';
import FontAwesome from 'react-fontawesome';
import { toogleItemAvailable } from '../reducers/categories';

const Item = ({ item }: { item: ItemType }) => {
  const dispatch = useDispatch();
  return (
    <div className="item" onClick={() => dispatch(toogleItemAvailable(item.id))}>
      <Switch on={item.available} />
      <span>{item.name}</span>
    </div>
  );
};

const Category = ({ category }: { category: CategoryType }) => {
  const [isOpen, setOpen] = useState(false);

  const icon = isOpen ? 'chevron-down' : 'chevron-right';

  return (
    <div className="category">
      <div className="title" onClick={() => setOpen(!isOpen)}>
        <FontAwesome name={icon} className="icon" />
        {category.name}
      </div>
      {isOpen ? (
        <div className="items">
          {category.items.map((item, itemIndex) => (
            <Item item={item} key={itemIndex} />
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const Items = () => {
  const categories = useSelector((state: State) => state.categories);

  return (
    <>
      <Navbar back="/" />
      <div id="items">
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
