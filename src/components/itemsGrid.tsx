import React, { useState } from 'react';

import _categories, { Item as ItemTypes } from '../categories';
import './itemsGrid.scss';
import { useSelector, useDispatch } from 'react-redux';
import formatPrice from '../utils/formatPrice';
import { addItem } from '../reducers/basket';
import { State } from '../reducers';
import { useLocation } from 'react-router';
import queryString from 'query-string';

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
      <span>{item.name}</span>
      <span>{displayPrice()}</span>
    </div>
  );
};

const ItemsGrid = () => {
  let categories = _categories;

  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  switch (queryParams.only) {
    case 'food':
      categories = categories.filter((category) => category.name !== process.env.REACT_APP_GOODIES_CATEGORY_NAME);
      break;

    case 'goodies':
      categories = categories.filter((category) => category.name === process.env.REACT_APP_GOODIES_CATEGORY_NAME);
      break;
  }

  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  const displayCategories = () => {
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
      <nav className="header">{displayCategories()}</nav>
      <div className="content">
        {currentCategory.items.map((item) => (
          <Item key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemsGrid;
