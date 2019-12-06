import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItem } from '../reducers/basket';
import './itemsGrid.scss';
import { State, Item as ItemType, Category } from '../types';
import { formatPrice } from '../utils/format';

interface ItemPropTypes {
  item: ItemType;
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
    // Supprime l'item tee shirt orga dans le cas où le prix orga n'est pas pris
    !(item.key === 'orga-tshirt' && !orgaPrice) && (
      <div className="item" onClick={() => addToBasket()}>
        <span className="name">{item.name}</span>
        <span className="price">{displayPrice()}</span>
      </div>
    )
  );
};

interface ItemsGridProps {
  categories: Array<Category>;
}

const ItemsGrid = ({ categories }: ItemsGridProps) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const currentCategory = categories[currentCategoryIndex];

  const displayCategories = () => {
    return categories.map((category, index) => {
      return (
        <span
          key={index}
          className={`category ${category.name === currentCategory.name ? 'active' : ''}`}
          onClick={() => setCurrentCategoryIndex(index)}>
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
