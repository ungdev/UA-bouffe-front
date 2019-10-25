import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import { useHistory } from 'react-router-dom';

import './navbar.scss';
import formatDate from '../utils/formatDate';

interface PropTypes {
  back: string;
  children: React.ReactNode;
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
      <div className="back" onClick={() => (back ? history.push(back) : false)}>
        {back ? <FontAwesome name="chevron-left"/> : ''}
      </div>
      <div>
        <span onClick={() => window.location.reload()}>TurboBouffe - { time }</span>
      </div>

      {children}
    </nav>
  );
};

export default Navbar;