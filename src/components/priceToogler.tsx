import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toogleOrgaPrice } from '../reducers/orgaPrice';
import { State } from '../reducers';

import './priceToogler.scss';

const PriceToogler = () => {
  const orgaPrice = useSelector((state: State) => state.orgaPrice);
  const dispatch = useDispatch();

  return (
    <div className={`price-toogler ${orgaPrice ? 'active' : ''}`} onClick={() => dispatch(toogleOrgaPrice())}>
      {orgaPrice ? 'Prix orga' : 'Prix normal'}
    </div>
  );
};

export default PriceToogler;
