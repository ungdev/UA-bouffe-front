import React from 'react';
import Modal from 'react-modal';

import './basket.scss';
import { State } from '../reducers';
import { Item } from '../categories';
import { useSelector, useDispatch } from 'react-redux';
import formatPrice from '../utils/formatPrice';
import { removeItem } from '../reducers/basket';

interface BasketItemPropTypes {
    item: Item;
    index: number;
}

const BasketItem = ({ item, index }: BasketItemPropTypes) => {
    const dispatch = useDispatch();

    const removeBasketItem = () => {
        dispatch(removeItem(index));
    };

    return (
        <div className="basket-item">
            <span className="item-name">{item.name}</span>
            <div className="delete" onClick={() => removeBasketItem()}>
                X
            </div>
        </div>
    );
};

const Basket = () => {
    const orgaPrice = useSelector((state: State) => state.orgaPrice);
    const basket = useSelector((state: State) => state.basket);

    const calculateTotal = () => {
        const total = basket.reduce((acc, curr) => acc + (orgaPrice ? curr.orgaPrice : curr.price), 0);

        return formatPrice(total);
    };

    const pay = () => {};

    return (
        <div className="basket">
            <div className="summary">
                {basket.map((item, index) => (
                    <BasketItem item={item} key={index} index={index} />
                ))}
            </div>
            <div className="pay" onClick={() => pay()}>
                {calculateTotal()}
            </div>
        </div>
    );
};

export default Basket;
