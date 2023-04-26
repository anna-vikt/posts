import cn from 'classnames';
import s from './styles.module.css';
import { createPortal } from 'react-dom';
export const Popup = ({popupActive, setPopupActive, children}) => {
    const renderContent = () => {
        return (
            <div className={cn(s.popup, {[s.active]: popupActive})} onMouseDown={() => setPopupActive(false)}>
                <div className={cn(s.popup__content, {[s.active]:popupActive })} onMouseDown={e => e.stopPropagation()}>
                    <button className={cn('btn', s.popup__close)} onClick={()=>setPopupActive(false)}>Close</button>
                    {children}
                </div>
            </div>    
        )    
    }
    return createPortal(renderContent(), document.getElementById('modal-root'));    
}
