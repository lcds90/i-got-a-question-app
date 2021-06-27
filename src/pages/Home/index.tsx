import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from 'components/Button';
import { useAuth } from 'hooks/useAuth';
import { database } from 'services/firebase';

import illustrationImg from 'assets/images/illustration.svg';
import logoImg from 'assets/images/logo.svg';
import googleIconImg from 'assets/images/google-icon.svg';
import './style.css';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    // NOTE Autenticação com Firebase
    if (!user) {
      await signInWithGoogle();
    }
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();
    if (roomCode.trim() === '') return;
    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if (!roomRef.exists()) {
      alert('Sala não existe');
      return;
    }

    if(roomRef.val().endedAt){
      alert('Sala encerrada');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id='page-auth'>
      <aside>
        <img
          src={illustrationImg}
          alt='Ilustração simbolizando perguntas e respostas'
        />
        <strong>
          Crie salas de <span>Q&amp;A</span> ao vivo
        </strong>
        <p className='aside-info'>
          Tirar as dúvidas da sua audiência em tempo real
        </p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt='IQAQ - I Got A Question' />
          <button onClick={handleCreateRoom} className='create-room'>
            <img src={googleIconImg} alt='Logo do Google' />
            Criar sala com o Google
          </button>
          <div className='separator'>Ou entrar em sala já criada</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type='text'
              placeholder='Digite o código da sala'
              onChange={(event) => setRoomCode(event.target.value)}
            />
            {/* TODO parei nas validacoes do firebase, 41:21 aula 03 */}
            <Button type='submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
