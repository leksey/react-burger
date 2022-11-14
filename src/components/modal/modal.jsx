import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import modalStyles from './modal.module.css';


function Modal({ children, state, setstate }) {
    return (
            <div className={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={`${modalStyles.modal__close} pt-15 pr-10`} onClick={() => setstate({ ...state, ingredientModalVisible: false, orderModalVisible: false })}>
                    <CloseIcon type="primary" />
                </button>
                {children}
            </div>
        )
}

export default Modal;