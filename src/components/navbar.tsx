import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import { useHistory } from 'react-router-dom';

import './navbar.scss';
import formatDate from '../utils/formatDate';

interface PropTypes {
  back?: string;
  children?: React.ReactNode;
}

const Navbar = ({ back, children }: PropTypes) => {
  const history = useHistory();
  const [time, setTime] = useState(formatDate(new Date()));

  useEffect(() => {
    setInterval(() => {
      setTime(formatDate(new Date()));
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
