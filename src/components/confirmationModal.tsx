import './confirmationModal.scss';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { PaymentMethod } from './basket';

export interface ModalProps {
  isOpen: boolean;
  onPay: (method: PaymentMethod) => void;
  onCancel: () => void;
}

interface Step {
  stage: number;
  method?: PaymentMethod;
}

Modal.setAppElement('#root');

const ConfirmationModal = ({ isOpen, onPay, onCancel }: ModalProps) => {
  let method = PaymentMethod.Card;
  const [currentStep, setCurrentStep] = useState(0);

  const showConfirmation = (_method: PaymentMethod) => {
    setCurrentStep(1);
    method = _method;
  };

  const finish = () => {
    setCurrentStep(0);
    onPay(method);
  };

  const steps = [
    <>
      <span className="title">Confirmer le paiement</span>
      <div className="content">
        <div className="button accent" onClick={() => showConfirmation(PaymentMethod.Card)}>
          Carte Bleue
        </div>

        <div className="button success" onClick={() => showConfirmation(PaymentMethod.Cash)}>
          Espèces
        </div>
        <div className="button cancel" onClick={() => onCancel()}>
          Annuler
        </div>
      </div>
    </>,
    <>
      <span className="title">
        Commande envoyée : <strong>#ESP_54</strong>
      </span>
      <div className="content">
        <div className="button accent" onClick={() => finish()}>
          Terminer
        </div>
      </div>
    </>,
  ];

  return (
    <Modal isOpen={isOpen} className="confirmation-modal">
      {steps[currentStep]}
    </Modal>
  );
};

export default ConfirmationModal;
