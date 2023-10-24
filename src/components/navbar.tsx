import React, { FC, useEffect, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

import './navbar.scss';
import { State } from '@/types';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

interface PropTypes {
  back?: string;
  children?: React.ReactNode;
  onBack?: () => void;
}

const Navbar: FC<PropTypes> = ({ back = null, children = null, onBack = null }) => {
  const [time, setTime] = useState(moment().format('H[h]mm'));
  const name = useSelector((state: State) => state.login.name);
  const serverOnline = useSelector((state: State) => state.server.internetConnected);
  const router = useRouter();

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
      router.push(back);
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

export default Navbar;
