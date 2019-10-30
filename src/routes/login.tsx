import React, { useState } from 'react';
import Navbar from '../components/navbar';

import './login.scss';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { tryLogin } from '../reducers/login';
import { useHistory } from 'react-router';

const Login = () => {
  const digits = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['x', '0', 'GO !']];

  const history = useHistory();
  const dispatch = useDispatch();
  const [pin, setPin] = useState('');

  const onClick = async (digit: string) => {
    switch (digit) {
      case digits[3][0]:
        setPin(pin.slice(0, pin.length - 1));
        break;

      case digits[3][2]:
        dispatch(tryLogin(pin, history));
        setPin('');
        break;

      default:
        setPin(`${pin}${digit}`);
    }
  };

  return (
    <div id="login">
      <Navbar back="/" />
      <div className="field">{pin.replace(/./g, '^')}</div>
      <div className="digits">
        {digits.map((digitsRow, index) => (
          <div className="digits-row" key={index}>
            {digitsRow.map((digit) => (
              <div className="digit" key={digit} onClick={() => onClick(digit)}>
                {digit}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Login;
