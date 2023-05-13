import cn from 'classnames';
import s from './styles.module.css';
import { Button } from '@mui/material';
import { createPortal } from 'react-dom';
export const Popup = ({popupActive, setPopupActive, children}) => {
    const handleClickClosePopup = () => {
        setPopupActive(false)}
    const renderContent = () => {
        return (
            <div className={cn(s.popup, {[s.active]: popupActive})} onMouseDown={handleClickClosePopup}>
                <div className={cn(s.popup__content, {[s.active]: popupActive })} onMouseDown={e => e.stopPropagation()}>
                    <Button className={cn('btn', s.popup__close)} onClick={handleClickClosePopup}>Close</Button>
                    {children}
                </div>
            </div>
        )    
    }
    return createPortal(renderContent(), document.getElementById('modal-root'));    
}