import cn from "classnames";
import s from './styles.module.css';
import { forwardRef } from "react";


export default forwardRef(function FormInput({typeTag, ...props}, ref) {
    return ( 
        typeTag === 'textarea'
        ? <textarea ref={ref} className={cn(s.input, s.textarea)} {...props}/>
        : <input ref={ref} className={cn(s.input )} {...props}/>
     );
})

