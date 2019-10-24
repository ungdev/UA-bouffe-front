import React, { useState } from 'react';

import Item from './item';

import categories from '../categories';
import './itemsGrid.scss';

const ItemsGrid = () => {

  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  const displayHeaders = () => {
    return categories
      .map((category, index) => {
        return (
        <span key={index} className={`category ${category.name === currentCategory.name ? 'active' : ''}`}
          onClick={() => setCurrentCategory(category)}>
          { category.name }
        </span>);
      });
  };

  return (
  <div className="items-grid">
    <nav className="header">
      <span>
        { displayHeaders() }
      </span>
    </nav>
    <div className="content">
      { currentCategory.items
        .map((item) => <Item key={item.key} item={item}/>)
      }
    </div>
  </div>
  );
};

export default ItemsGrid;