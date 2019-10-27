import React from 'react';
import Modal from './modal';

export interface ModalProps {
  isOpen: boolean;
  orderName: string;
  onClose: () => void;
}

const ConfirmOrder = ({ isOpen, orderName, onClose }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} className="confirmation-modal">
      <>
        <span className="title">
          Commande <strong>{orderName}</strong> envoyée
        </span>
        <div className="content">
          <div className="button accent" onClick={() => onClose()}>
            Terminer
          </div>
        </div>
      </>
    </Modal>
  );
};

export default ConfirmOrder;
