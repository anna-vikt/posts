
import './styles.css';
import { Button } from '@mui/material';

export const Popup = ({popupActive, setPopupActive, children}) => {
   
    const handleClickClosePopup = () => {
        setPopupActive(false)
    }
    
    return (
        <div className={popupActive ? 'popup active' : 'popup'} onClick={handleClickClosePopup}>
            <div className={popupActive ? 'popup__content active' : 'popup__content'} onClick={e => e.stopPropagation()}>
            <Button className="popup__close" onClick={handleClickClosePopup}>Close</Button>
                {children}
            </div>
        </div>    
    )    
}