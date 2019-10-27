import React from 'react';
import ModalComponent from 'react-modal';

import './modal.scss';

interface ModalProps {
  isOpen: boolean;
  className?: string;
  children: React.ReactNode;
}

ModalComponent.setAppElement('#root');

const Modal = ({ isOpen, className, children: children }: ModalProps) => {
  return (
    <ModalComponent isOpen={isOpen} className={`modal ${className ? className : ''}`}>
      {children ? children : ''}
    </ModalComponent>
  );
};

export default Modal;
