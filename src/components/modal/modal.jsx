import s from './styles.module.css';

function Modal({active, setActive, children}) {
    return ( 
        <div className={s.modal}>
            <div className={s.modal__content}>
                {children}
            </div>
        </div>
     );
}

export default Modal;