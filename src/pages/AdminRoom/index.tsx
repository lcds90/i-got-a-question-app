import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { database } from 'services/firebase';
// import { useAuth } from 'hooks/useAuth';

import { Button } from 'components/Button';
import { Question } from 'components/Question';
import { RoomCode } from 'components/RoomCode';

import logoImg from 'assets/images/logo.svg';
import deleteImg from 'assets/images/delete.svg';
import checkImg from 'assets/images/check.svg';
import answerImg from 'assets/images/answer.svg';

import './style.css';
import { useRoom } from 'hooks/useRoom';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  async function handleAnsweredQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }
  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: true,
    });
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que quer remover?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });
    history.push('/');
  }

  return (
    <main id='page-admin-room'>
      <header>
        <div className='content'>
          <img src={logoImg} alt='LetMeAsk' />
          <div>
            <RoomCode code={roomId} />
            <Button onClick={handleEndRoom} isOutlined>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>
      <section>
        <article className='room-title'>
          <h1>Sala {title}</h1>
          <span>
            {questions.length > 0
              ? `${questions.length} pergunta(s)`
              : 'Não há nenhuma pergunta para a sala.'}
          </span>
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
                {!question.isAnswered && (
                  <>
                    <button
                      type='button'
                      onClick={() =>
                        handleAnsweredQuestionAsAnswered(question.id)
                      }
                    >
                      <img
                        src={answerImg}
                        alt='Marcar pergunta como respondida'
                      />
                    </button>
                    <button
                      type='button'
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={checkImg} alt='Destacar pergunta' />
                    </button>
                  </>
                )}
                <button
                  type='button'
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt='Remover pergunta' />
                </button>
              </Question>
            );
          })}
        </article>
      </section>
    </main>
  );
}
