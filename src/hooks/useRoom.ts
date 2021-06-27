import { useEffect, useState } from 'react';
import { database } from 'services/firebase';
import { useAuth } from './useAuth'

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    likes: Record<string, {
      authorId: string;
    }>
  }
>;

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
  likeCount: number;
  likedId: string | undefined;
};

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    // TODO Deixar aplicação mais performatica, pois utilizando value com uma lista grande irá recarregar todos as perguntas novamente.
    // LINK https://firebase.google.com/docs/database/admin/retrieve-data#value
      roomRef.on('value', (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighLighted: value.isHighLighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likedId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
          };
        }
      );
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });

    return () => {
      // NOTE Boas praticas: é muito importante sempre quando for aplicar um eventListener no React, que você realize o unsubscribe pois mesmo que o componente saia de tela, ele irá continuar executando e isso pode levar a um erro
      roomRef.off('value');
    };

  }, [roomId, user?.id]);

  return { questions, title }
}
