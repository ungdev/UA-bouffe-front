import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItem } from '@/reducers/basket';
import './itemsGrid.scss';
import { Category, Item as ItemType, State, Supplement } from '../types';
import { formatPrice } from '@/utils/format';
import Modal from './modals/modal';

interface ItemsGridProps {
  categories: Array<Category>;
}

const ItemsGrid = ({ categories }: ItemsGridProps) => {
  const dispatch = useDispatch();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const currentCategory = categories[currentCategoryIndex];
  const [displayedItem, setDisplayedItem] = useState<ItemType>();
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const orgaPrice = useSelector((state: State) => state.orgaPrice);

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

  const displayPrice = (item: ItemType) => {
    if (orgaPrice) {
      return formatPrice(item.orgaPrice);
    }

    return formatPrice(item.price);
  };

  const addToBasket = (item: ItemType) => {
    dispatch(
      addItem({
        ...item,
        supplements,
      }),
    );
  };

  const select = (item: ItemType) => {
    if (item.supplements.length) {
      setDisplayedItem(item);
    } else {
      addToBasket(item);
    }
  };

  return (
    <div className="items-grid">
      <nav className="header">{displayCategories()}</nav>
      <div className="content">
        {currentCategory.items.map(
          (item) =>
            // Supprime l'item tee shirt orga dans le cas où le prix orga n'est pas pris
            !(item.key === 'orga-tshirt' && !orgaPrice) && (
              <div key={"item.id"} className="item" onClick={() => select(item)}>
                <span
                  className="name"
                  data-details={item.name
                    .match(/\(.*\)/g)
                    ?.map((value) => value.substring(1, value.length - 1))
                    ?.join(', ')}>
                  {item.name.replace(/\(.*\)/g, '')}
                </span>
                <span className="price">{displayPrice(item)}</span>
              </div>
            ),
        )}
      </div>
      {displayedItem && (
        <Modal isOpen={true}>
          <div>Selectionner les options/suppléments</div>
          <div className="supplement-list">
            {displayedItem.supplements.map((supplement) => (
              <div
                key={supplement.key}
                className={
                  'supplement' +
                  (supplements.includes(supplement) ? ' selected' : '') +
                  (!supplement.available ? ' unavailable' : '')
                }
                onClick={() => {
                  if (supplements.includes(supplement)) {
                    const updatedSupplements = supplements.slice();
                    updatedSupplements.splice(updatedSupplements.indexOf(supplement));
                    setSupplements(updatedSupplements);
                  } else if (supplement.available) {
                    const updatedSupplements = supplements.slice();
                    updatedSupplements.push(supplement);
                    setSupplements(updatedSupplements);
                  }
                }}>
                {supplement.name}
                {(() => {
                  const price = orgaPrice ? supplement.orgaPrice : supplement.price;
                  if (price !== 0) return ` ${formatPrice(price)}`;
                })()}
              </div>
            ))}
          </div>
          <div
            className="button"
            onClick={() => {
              addToBasket(displayedItem);
              setSupplements([]);
              setDisplayedItem(null);
            }}>
            Confirmer
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ItemsGrid;
