import { useEffect } from 'react';
import modalOverlayStyles from './modal-overlay.module.css';
import { childrenType, closePopupType } from '../../utils/types';

function ModalOverlay({ children, closePopup }) {

    useEffect(() => {
        function handleEscapeKey(evt) {
          if (evt.key === 'Escape') {
            closePopup();
          }
        }
        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
      }, [])

    return (
            <div className={modalOverlayStyles.modal__overlay} onClick={() => closePopup()}>
                {children}
            </div>
    );
}

ModalOverlay.propTypes =  {
  children: childrenType,
  closePopup: closePopupType
};

export default ModalOverlay;
