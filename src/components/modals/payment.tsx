import React, { useState, ReactNode } from 'react';
import Modal from './modal';
import { PaymentMethod } from '../../types';
import FontAwesome from 'react-fontawesome';

import './payment.scss';
import { formatMethod } from '../../utils/format';

const letters = [
  ['A', 'B', 'C', 'D', 'E', 'F'],
  ['G', 'H', 'I', 'J', 'K', 'L'],
  ['M', 'N', 'O', 'P', 'Q', 'R'],
  ['S', 'T', 'U', 'V', 'W', 'X'],
];

const digits = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  [<FontAwesome key="backspace" name="backspace" />, '0', ''],
];

interface ModalProps {
  isOpen: boolean;
  onPay: (place: string, method: PaymentMethod) => void;
  onCancel: () => void;
}

const PaymentMethodModal = ({ isOpen, onPay, onCancel }: ModalProps) => {
  const [currentLetter, setCurrentLetter] = useState('');
  const [currentDigit, setCurrentDigit] = useState('');

  const onDigitClick = (digit: string | ReactNode) => {
    switch (digit) {
      // backspace
      case digits[3][0]:
        setCurrentDigit(currentDigit.slice(0, currentDigit.length - 1));
        break;

      default:
        setCurrentDigit(currentDigit.length < 2 ? `${currentDigit}${digit}` : currentDigit);
    }
  };

  const onPayClick = (method: PaymentMethod) => {
    if (currentLetter && currentDigit) {
      const place = `${currentLetter}${currentDigit}`;
      setCurrentDigit('');
      setCurrentLetter('');
      onPay(place, method);
    }
  };

  return (
    <Modal isOpen={isOpen} className="payment-modal">
      <div onClick={() => onCancel()} className="cancel">
        <FontAwesome name="times" />
      </div>
      <span className="title">
        Confirmer la commande {currentLetter}
        {currentDigit}
      </span>
      <div className="content">
        <div className="keyboard">
          <div className="grid">
            {letters.map((row, index) => (
              <div className="row" key={index}>
                {row.map((letter) => (
                  <div
                    className={`card ${letter === currentLetter ? 'active' : ''}`}
                    key={letter}
                    onClick={() => setCurrentLetter(letter)}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="grid">
            {digits.map((row, rowIndex) => (
              <div className="row" key={rowIndex}>
                {row.map((digit, index) => (
                  <div className="card" key={index} onClick={() => onDigitClick(digit)}>
                    {digit}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="buttons">
          <div className="button accent" onClick={() => onPayClick(PaymentMethod.Card)}>
            {formatMethod(PaymentMethod.Card)}
          </div>

          <div className="button success" onClick={() => onPayClick(PaymentMethod.Cash)}>
            {formatMethod(PaymentMethod.Cash)}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentMethodModal;
