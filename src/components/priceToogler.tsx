import { useDispatch, useSelector } from 'react-redux';

import React from 'react';

import './priceToogler.scss';
import { toogleOrgaPrice } from '../reducers/orgaPrice';
import { State } from '../types';

const PriceToogler = () => {
  const orgaPrice = useSelector((state: State) => state.orgaPrice);
  const dispatch = useDispatch();

  return (
    <div className={`price-toogler ${orgaPrice ? 'active' : ''}`} onClick={() => dispatch(toogleOrgaPrice())}>
      {orgaPrice ? 'Mode orga' : 'Mode normal'}
    </div>
  );
};

export default PriceToogler;
