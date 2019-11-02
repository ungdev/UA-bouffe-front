import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';

import { history } from '../components/loginRouter';
import './navbar.scss';

interface PropTypes {
  back?: string;
  children?: React.ReactNode;
}

const Navbar = ({ back, children }: PropTypes) => {
  const [time, setTime] = useState(moment().format('H[h]mm'));

  useEffect(() => {
    setInterval(() => {
      setTime(moment().format('H[h]mm'));
    }, 1000 * 60);
  }, []);

  return (
    <nav className="navbar">
      {back ? (
        <div className="back" onClick={() => (back ? history.push(back) : false)}>
          <FontAwesome name="chevron-left" />
        </div>
      ) : (
        ''
      )}
      <span className="title" onClick={() => window.location.reload()}>
        TurboBouffe - {time}
      </span>

      {children ? children : ''}
    </nav>
  );
};

export default Navbar;
