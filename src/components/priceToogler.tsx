import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toogleOrgaPrice } from '../reducers/orgaPrice';
import { State } from '../reducers';

const PriceToogler = () => {
  const orgaPrice = useSelector((state: State) => state.orgaPrice);
  const dispatch = useDispatch();

  return <div onClick={() => dispatch(toogleOrgaPrice())}>{orgaPrice ? 'Prix orgaaa' : 'Prix normal'}</div>;
};

export default PriceToogler;