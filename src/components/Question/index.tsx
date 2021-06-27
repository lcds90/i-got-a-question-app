import { ReactNode } from 'react';
import './style.css';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHighLighted?: boolean;
}

export function Question(
    {
        content,
        author,
        children,
        isAnswered = false,
        isHighLighted = false,
    }: QuestionProps) {
    return (
        <section className={`question
        ${isAnswered ? 'answered' : ''} ${isHighLighted && !isAnswered ? 'highlighted' : ''}`}>
            <article className="user-info">
                <img src={author.avatar} alt={`Foto de ${author.name}`} />
                <span>{author.name}</span>
            </article>
        <p>{content}</p>
        <article>
            {children}
        </article>
    </section> 
    )   
}
