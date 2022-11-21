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
  const serverOnline = useSelector((state: State) => state.server.internetConnected);

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
      <div className="back absolute-left" onClick={() => (back ? onBackClick() : null)}>
        {back ? <FontAwesome name="chevron-left" /> : ''}
        <div className={serverOnline ? 'online' : 'offline'} onClick={() => onBackClick()}>
          <FontAwesome name={serverOnline ? 'check-circle' : 'exclamation-circle'} />{' '}
          {serverOnline ? 'En ligne' : 'Hors ligne'}
        </div>
      </div>
      <span className="title" onClick={() => window.location.reload()}>
        <FontAwesome name="sync-alt" className="reload-icon" /> {time} - {name}
      </span>

      <div className="absolute-right">{children ? children : ''}</div>
    </nav>
  );
};

Navbar.defaultProps = {
  back: null,
  onBack: null,
  children: null,
};

export default Navbar;
