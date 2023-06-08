import cn from 'classnames';
import s from './styles.module.css';
import { Button } from '@mui/material';
import { createPortal } from 'react-dom';
import { useRef } from 'react';
export const Popup = ({popupActive, children, onClose}) => {
    const refModal = useRef(null)
    const renderContent = () => { 
        if(!onClose) return null
        return (
            <div ref={refModal} className={cn(s.popup, {[s.active]: popupActive})} onMouseDown={onClose}>
                <div className={cn(s.popup__content, {[s.active]: popupActive })} onMouseDown={e => e.stopPropagation()}>
                    <Button className={cn('btn', s.popup__close)} onClick={onClose}>Close</Button>
                    {children}
                </div>
            </div>
        )    
    }
    return createPortal(renderContent(), document.getElementById('modal-root'));    
}