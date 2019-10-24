import React, { ReactElement } from 'react';


import items from '../items'
import './itemsGrid.scss';

const ItemsGrid = () : ReactElement => {



  return (
  <div className="items-grid">
    <nav className="items-grid-header">
      <span>{ items.map(item => item.category)}</span>
    </nav>
    <div className="items-grid-content">
      { items.map(item => item.items.map(item => item.name))}
    </div>
  </div>
  )
}

export default ItemsGrid;