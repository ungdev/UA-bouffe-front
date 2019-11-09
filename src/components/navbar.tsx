import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

import { history } from '../components/loginRouter';
import './navbar.scss';
import { State } from '../types';
import { useSelector } from 'react-redux';

interface PropTypes {
  back?: string;
  onBack?: () => void;
  children?: React.ReactNode;
}

const Navbar = ({ back, onBack, children }: PropTypes) => {
  const [time, setTime] = useState(moment().format('H[h]mm'));
  const name = useSelector((state: State) => state.login.name);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format('H[h]mm'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const onBackClick = () => {
    if (onBack) {
      onBack();
    }

    if (back) {
      history.push(back);
    }
  };

  return (
    <nav className="navbar">
      {back ? (
        <div className="back" onClick={() => onBackClick()}>
          <FontAwesome name="chevron-left" />
        </div>
      ) : (
        ''
      )}
      <span className="title" onClick={() => window.location.reload()}>
        TurboBouffe - {name} - {time}
      </span>

      {children ? children : ''}
    </nav>
  );
};

export default Navbar;
