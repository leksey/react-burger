import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { childrenType, closePopupType } from '../../utils/types';

import modalStyles from './modal.module.css';


function Modal({ children, closePopup }) {
    const modalRoot = document.getElementById("root");
    return ReactDOM.createPortal((
        <ModalOverlay closePopup={closePopup}>
            <div className={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={`${modalStyles.modal__close} pt-15 pr-10`} onClick={() => closePopup()}>
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
    closePopup: closePopupType
};

export default Modal;
