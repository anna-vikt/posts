import s from "./styles.module.css"

function Form( {handleFormSubmit, title, children} ) {
    return (
        <form className={s.form} onSubmit={handleFormSubmit}>
            {title && <h3 className={s.title}>{title}</h3>}
            {children}
        </form>
    );
}
export default Form;