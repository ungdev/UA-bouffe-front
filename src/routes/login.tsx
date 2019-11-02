import React, { useState, ReactNode } from 'react';

import './login.scss';
import { useDispatch } from 'react-redux';
import { tryLogin } from '../reducers/login';
import FontAwesome from 'react-fontawesome';

const Login = () => {
  const digits = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    [<FontAwesome key="backspace" name="backspace" />, '0', <FontAwesome key="check" name="check" />],
  ];

  const dispatch = useDispatch();
  const [pin, setPin] = useState('');

  const onClick = async (digit: string | ReactNode) => {
    switch (digit) {
      case digits[3][0]:
        setPin(pin.slice(0, pin.length - 1));
        break;

      case digits[3][2]:
        dispatch(tryLogin(pin));
        setPin('');
        break;

      default:
        setPin(pin.length < 6 ? `${pin}${digit}` : pin);
    }
  };

  return (
    <>
      <div id="login">
        <div className="field">{pin.replace(/./g, '•')}</div>
        <div className="digits">
          {digits.map((digitsRow, index) => (
            <div className="digits-row" key={index}>
              {digitsRow.map((digit, index) => (
                <div className="digit" key={index} onClick={() => onClick(digit)}>
                  {digit}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Login;
