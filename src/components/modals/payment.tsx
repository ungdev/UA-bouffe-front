import React, { useState, ReactNode, useEffect } from 'react';
import Modal from './modal';
import { PaymentMethod, State } from '../../types';
import FontAwesome from 'react-fontawesome';

import './payment.scss';
import { formatMethod } from '../../utils/format';
import { useSelector, useDispatch } from 'react-redux';
import ConfirmModal from './confirmation';
import { clearBasket } from '../../reducers/basket';
import { setNormalPrice } from '../../reducers/orgaPrice';

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

const VISITOR_LETTER = 'Y';
const ORGA_LETTER = 'Z';

interface ModalProps {
  isOpen: boolean;
  total: number;
  onPay: (place: string, method: PaymentMethod) => void;
  onClose: () => void;
}

const PaymentMethodModal = ({ isOpen, onPay, onClose }: ModalProps) => {
  const orgaPrice = useSelector((state: State) => state.orgaPrice);
  const [currentLetter, setCurrentLetter] = useState('');
  const [currentDigit, setCurrentDigit] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [errored, setErrored] = useState(false);

  const [confirmOpened, setConfirmOpened] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentLetter(orgaPrice ? ORGA_LETTER : '');
  }, [isOpen]); // eslint-disable-line

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
    if (currentLetter && currentDigit) {
      setConfirmOpened(true);
      setPaymentMethod(method);
    } else {
      setErrored(true);
      await new Promise((resolve) => setTimeout(resolve, 50));
      setTimeout(() => setErrored(false), 100);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  };

  const onConfirm = async () => {
    if (!loading) {
      setLoading(true);
      const place = `${currentLetter}${currentDigit}`;
      await onPay(place, paymentMethod);
      setConfirmOpened(false);
      setCurrentDigit('');
      setCurrentLetter('');
      setLoading(false);
    }
  };

  const onConfirmCancel = () => {
    setConfirmOpened(false);
    onClose();
    setCurrentDigit('');
    setCurrentLetter('');
    dispatch(clearBasket());
    dispatch(setNormalPrice());
  };

  return confirmOpened ? (
    <ConfirmModal
      isOpen={confirmOpened}
      loading={loading}
      onConfirm={() => onConfirm()}
      onCancel={() => onConfirmCancel()}
    />
  ) : (
    <Modal isOpen={isOpen} className="payment-modal">
      <div onClick={() => onClose()} className="cancel">
        <FontAwesome name="times" />
      </div>
      <span className="title">
        Confirmer la commande{' '}
        <span className="order">
          {currentLetter} {currentDigit}
        </span>
      </span>
      <div className="content">
        <div className="keyboard">
          <div className="letter-grid">
            <div className="grid">
              {letters.map((row, index) => (
                <div className="row" key={index}>
                  {row.map((letter) => (
                    <div
                      className={`card ${letter === currentLetter ? 'active' : ''} ${orgaPrice ? 'disabled' : ''} ${
                        errored ? 'error' : ''
                      }`}
                      key={letter}
                      onClick={() => setCurrentLetter(!orgaPrice ? letter : currentLetter)}>
                      {letter}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div
              className={`visitor-card card ${currentLetter === VISITOR_LETTER ? 'active' : ''} ${
                orgaPrice ? 'disabled' : ''
              } ${errored ? 'error' : ''}`}
              onClick={() => setCurrentLetter(!orgaPrice ? VISITOR_LETTER : currentLetter)}>
              <span>Visiteur</span>
              <span>Sponsor</span>
              <span>Caster</span>
            </div>
          </div>
          <div className="grid">
            {digits.map((row, rowIndex) => (
              <div className="row" key={rowIndex}>
                {row.map((digit, index) => (
                  <div className={`card ${errored ? 'error' : ''}`} key={index} onClick={() => onDigitClick(digit)}>
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
