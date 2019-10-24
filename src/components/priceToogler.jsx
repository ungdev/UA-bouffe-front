import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toogleOrgaPrice } from '../reducers/orgaPrice';

const PriceToogler = () => {

  const orgaPrice = useSelector((state) => state.orgaPrice);
  const dispatch = useDispatch();

  return (
    <div onClick={() => dispatch(toogleOrgaPrice())}>{ orgaPrice ? 'Prix orgaaa' : 'Prix normal' }</div>
  );
};

export default PriceToogler;