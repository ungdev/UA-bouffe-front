import React from 'react';
import Modal from 'react-modal';

import './confirmationModal.scss';
import { PaymentMethod } from './basket';

export interface ModalProps {
  isOpen: boolean;
  onPay: (method: PaymentMethod) => void;
  onCancel: () => void;
}

Modal.setAppElement('#root');

const ConfirmationModal = ({ isOpen, onPay, onCancel }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} className="confirmation-modal">
      <span className="title">Confirmer le paiement</span>
      <div className="content">
        <div className="card" onClick={() => onPay(PaymentMethod.Card)}>
          Carte Bleue
        </div>

        <div className="cash" onClick={() => onPay(PaymentMethod.Cash)}>
          Espèces
        </div>
        <div className="cancel" onClick={() => onCancel()}>
          Annuler
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
