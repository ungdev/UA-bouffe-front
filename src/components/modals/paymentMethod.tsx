import React from 'react';
import Modal from './modal';
import { PaymentMethod } from '../basket';

export interface ModalProps {
  isOpen: boolean;
  onPay: (method: PaymentMethod) => void; // Returns the command name
  onCancel: () => void;
}

const PaymentMethodModal = ({ isOpen, onPay, onCancel }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} className="confirmation-modal">
      <>
        <span className="title">Confirmer le paiement</span>
        <div className="content">
          <div className="button accent" onClick={() => onPay(PaymentMethod.Card)}>
            Carte Bleue
          </div>

          <div className="button success" onClick={() => onPay(PaymentMethod.Cash)}>
            Espèces
          </div>
          <div className="button cancel" onClick={() => onCancel()}>
            Annuler
          </div>
        </div>
      </>
    </Modal>
  );
};

export default PaymentMethodModal;
