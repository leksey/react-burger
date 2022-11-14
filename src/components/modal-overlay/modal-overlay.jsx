import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import modalOverlayStyles from './modal-overlay.module.css';

function ModalOverlay({ children, state, setstate }) {
    const modalRoot = document.getElementById("root");
    return ReactDOM.createPortal(
        (
            <div className={modalOverlayStyles.modal__overlay} onClick={() => setstate({ ...state, ingredientModalVisible: false, orderModalVisible: false })}>
                {children}
            </div>
        ), 
        modalRoot
    );
}

export default ModalOverlay;