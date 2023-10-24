import React from 'react';
import Modal from './modal';

import './confirmation.scss';
import FontAwesome from 'react-fontawesome';
import Loader from '../loader';
import { formatPrice } from "@/utils/format";

interface ModalProps {
  isOpen: boolean;
  loading: boolean;
  total: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({ isOpen, onConfirm, onCancel, loading, total }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} className="confirmation-modal">
      <div>Procéder au paiement</div>
      <div className="total">{formatPrice(total)}</div>
      <div className="important">
        <FontAwesome name="exclamation-triangle" />
        Ne valider que quand le paiement a été effectué
        <FontAwesome name="exclamation-triangle" />
      </div>
      <div className="buttons">
        <div className="button cancel" onClick={() => onCancel()}>
          {loading ? <Loader /> : 'Annuler le paiement'}
        </div>
        <div className="button confirm" onClick={() => onConfirm()}>
          {loading ? <Loader /> : 'Paiement effectué'}
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
