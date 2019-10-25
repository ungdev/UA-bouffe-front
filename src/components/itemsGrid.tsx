import React, { useState } from 'react';

import categories, { Item as ItemTypes } from '../categories';
import './itemsGrid.scss';
import { useSelector, useDispatch } from 'react-redux';
import formatPrice from '../utils/formatPrice';
import { addItem } from '../reducers/basket';
import { State } from '../reducers';

interface ItemPropTypes {
  item: ItemTypes;
}

const Item = ({ item }: ItemPropTypes) => {
  const dispatch = useDispatch();
  const orgaPrice = useSelector((state: State) => state.orgaPrice);

  const displayPrice = () => {
    if (orgaPrice) {
      return formatPrice(item.orgaPrice);
    }

    return formatPrice(item.price);
  };

  const addToBasket = () => {
    dispatch(addItem(item));
  };

  return (
    <div className="item" onClick={() => addToBasket()}>
      {item.name} - <br /> {displayPrice()}
    </div>
  );
};

const ItemsGrid = () => {
  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  const displayHeaders = () => {
    return categories.map((category, index) => {
      return (
        <span
          key={index}
          className={`category ${category.name === currentCategory.name ? 'active' : ''}`}
          onClick={() => setCurrentCategory(category)}
        >
          {category.name}
        </span>
      );
    });
  };

  return (
    <div className="items-grid">
      <nav className="header">
        <span>{displayHeaders()}</span>
      </nav>
      <div className="content">
        {currentCategory.items.map((item) => (
          <Item key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemsGrid;