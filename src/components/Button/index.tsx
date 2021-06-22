import { ButtonHTMLAttributes } from 'react';
import './style.css';
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps){
    return(
        // NOTE Aqui ele está distribuindo todas as propriedades como parametro com o spread operator
        <button className="button" {...props} />
    )
}