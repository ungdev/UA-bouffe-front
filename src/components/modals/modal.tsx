import React from 'react';
import ModalComponent from 'react-modal';

import './modal.scss';

interface ModalProps {
  isOpen: boolean;
  className?: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, className, children }: ModalProps) => {
  return (
    <ModalComponent isOpen={isOpen} className={`modal ${className ? className : ''}`} overlayClassName="overlay">
      {children ? children : ''}
    </ModalComponent>
  );
};

Modal.defaultProps = {
  className: '',
};

export default Modal;
