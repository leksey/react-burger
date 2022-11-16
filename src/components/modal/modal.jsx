import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { childrenType, setStateType, modalStateType } from '../utils/types';

import modalStyles from './modal.module.css';


function Modal({ children, modalState, setModalState }) {
    const modalRoot = document.getElementById("root");
    return ReactDOM.createPortal((
        <ModalOverlay modalState={modalState} setModalState={setModalState}>
            <div className={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={`${modalStyles.modal__close} pt-15 pr-10`} onClick={() => setModalState({...modalState, ingredientModalVisible: false, orderModalVisible: false })}>
                    <CloseIcon type="primary" />
                </button>
                {children}
            </div>
        </ModalOverlay>
        ), modalRoot
    );
}

Modal.propTypes =  {
    children: childrenType,
    modalState: modalStateType,
    setModalState: setStateType
};

export default Modal;
