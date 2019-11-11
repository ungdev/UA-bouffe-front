import React, { useState, ReactNode, useEffect } from 'react';
import Modal from './modal';
import { PaymentMethod, State } from '../../types';
import FontAwesome from 'react-fontawesome';

import './payment.scss';
import { formatMethod, formatPrice } from '../../utils/format';
import { useSelector } from 'react-redux';

const letters = [
  ['A', 'B', 'C', 'D', 'E'],
  ['F', 'G', 'H', 'I', 'J'],
  ['K', 'L', 'M', 'N', 'O'],
  ['P', 'Q', 'R', 'S', 'T'],
];

const digits = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  [<FontAwesome key="backspace" name="backspace" />, '0', ''],
];

interface ModalProps {
  isOpen: boolean;
  total: number;
  onPay: (place: string, method: PaymentMethod) => void;
  onCancel: () => void;
}

const PaymentMethodModal = ({ isOpen, total, onPay, onCancel }: ModalProps) => {
  const orgaPrice = useSelector((state: State) => state.orgaPrice);
  const [currentLetter, setCurrentLetter] = useState('');
  const [currentDigit, setCurrentDigit] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentLetter(orgaPrice ? process.env.REACT_APP_ORGA_LETTER : '');
  }, [isOpen]);

  const onDigitClick = (digit: string | ReactNode) => {
    switch (digit) {
      // backspace
      case digits[3][0]:
        setCurrentDigit(currentDigit.slice(0, currentDigit.length - 1));
        break;

      default:
        setCurrentDigit(currentDigit.length < 3 ? `${currentDigit}${digit}` : currentDigit);
    }
  };

  const onPayClick = async (method: PaymentMethod) => {
    if (currentLetter && currentDigit && !loading) {
      setLoading(true);
      const place = `${currentLetter}${currentDigit}`;
      await onPay(place, method);
      setCurrentDigit('');
      setCurrentLetter('');
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} className="payment-modal">
      <div onClick={() => onCancel()} className="cancel">
        <FontAwesome name="times" />
      </div>
      <span className="title">
        Confirmer la commande {currentLetter} {currentDigit} ({formatPrice(total)})
      </span>
      <div className="content">
        <div className="keyboard">
          <div className="letter-grid">
            <div className="grid">
              {letters.map((row, index) => (
                <div className="row" key={index}>
                  {row.map((letter) => (
                    <div
                      className={`card ${letter === currentLetter ? 'active' : ''} ${!orgaPrice ? 'hover' : ''}`}
                      key={letter}
                      onClick={() => setCurrentLetter(!orgaPrice ? letter : currentLetter)}>
                      {letter}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div
              className={`visitor-card card ${currentLetter === process.env.REACT_APP_VISITOR_LETTER ? 'active' : ''} ${
                !orgaPrice ? 'hover' : ''
              }`}
              onClick={() => setCurrentLetter(!orgaPrice ? process.env.REACT_APP_VISITOR_LETTER : currentLetter)}>
              <span>Visiteur</span>
              <span>Sponsor</span>
              <span>Caster</span>
            </div>
          </div>
          <div className="grid">
            {digits.map((row, rowIndex) => (
              <div className="row" key={rowIndex}>
                {row.map((digit, index) => (
                  <div className="card hover" key={index} onClick={() => onDigitClick(digit)}>
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
