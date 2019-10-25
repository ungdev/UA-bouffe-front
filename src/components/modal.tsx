import ModalComponent from 'react-modal';
import { useState } from 'react';

ModalComponent.setAppElement('#root');

const Modal = () => {
    const [opened, setOpened] = useState(false);

    return <ModalComponent isOpen={opened} contentLabel="blablabla"></ModalComponent>;
};

export default Modal;
