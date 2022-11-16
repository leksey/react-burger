import { useEffect } from 'react';
import modalOverlayStyles from './modal-overlay.module.css';
import { childrenType, setStateType, modalStateType } from '../utils/types';

function ModalOverlay({ children, modalState, setModalState }) {

    useEffect(() => {
        function handleEscapeKey(evt) {
          if (evt.key === 'Escape') {
            setModalState({...modalState, ingredientModalVisible: false, orderModalVisible: false });
          }
        }
        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
      }, [modalState])

    return (
            <div className={modalOverlayStyles.modal__overlay} onClick={() => setModalState({...modalState, ingredientModalVisible: false, orderModalVisible: false })}>
                {children}
            </div>
    );
}

ModalOverlay.propTypes =  {
  children: childrenType,
  modalState: modalStateType,
  setModalState: setStateType
};

export default ModalOverlay;
