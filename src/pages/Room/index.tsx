import { useParams } from 'react-router';
import { FormEvent, useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import { database } from 'services/firebase';

import { Button } from 'components/Button';
import { Question } from 'components/Question';
import { RoomCode } from 'components/RoomCode';
import { LikeButton } from 'components/Like';

import logoImg from 'assets/images/logo.svg';
import './style.css';
import { useRoom } from 'hooks/useRoom';

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');
  const { title, questions } = useRoom(roomId);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === '') return;
    if (!user) throw new Error('Você precisa estar logado!');
    // TODO react hot toast, se sala estiver com endedAt redirecionar para home

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);
    setNewQuestion('');
  }

  async function handleLikeQuestion(
    questionId: string,
    likedId: string | undefined
  ) {
    if (likedId) {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likedId}`).remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
  }

  return (
    <main id='page-room'>
      <header>
        <div className='content'>
          <img src={logoImg} alt='LetMeAsk' />
          <RoomCode code={roomId} />
        </div>
      </header>
      <section>
        <article className='room-title'>
          <h1>Sala {title}</h1>
          <span>
            {questions.length > 0
              ? `${questions.length} pergunta(s)`
              : 'Realize a primeira pergunta'}
          </span>
        </article>
        <article>
          <form onSubmit={handleSendQuestion}>
            <textarea
              placeholder='Qual sua pergunta?'
              onChange={(event) => setNewQuestion(event.target.value)}
              value={newQuestion}
            ></textarea>
            <div className='form-footer'>
              {user ? (
                <div className='user-info'>
                  <img src={user.avatar} alt={`Foto de ${user.name}`} />
                  <span>{user.name}</span>
                </div>
              ) : (
                <span>
                  Para enviar uma pergunta, <button>entre com sua conta</button>
                </span>
              )}
              <Button disabled={!user} type='submit'>
                Enviar pergunta
              </Button>
            </div>
          </form>
        </article>
        <article className='question-list'>
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighLighted={question.isHighLighted}
              >
                <button
                  className='like-button'
                  type='button'
                  aria-label='Marcar como gostei'
                  onClick={() =>
                    handleLikeQuestion(question.id, question.likedId)
                  }
                >
                  <span>{question.likeCount}</span>
                  <LikeButton liked={question.likedId} />
                </button>
              </Question>
            );
          })}
        </article>
      </section>
    </main>
  );
}
