import './styles.css';

export const Popup = ({popupActive, setPopupActive, children}) => {
    return (
        <div className={popupActive ? 'popup active' : 'popup'} onClick={() => setPopupActive(false)}>
            <div className={popupActive ? 'popup__content active' : 'popup__content'} onClick={e => e.stopPropagation()}>
            <button className="popup__close btn" onClick={()=>setPopupActive(false)}>Close</button>
                {children}
            </div>
        </div>    
    )    
}