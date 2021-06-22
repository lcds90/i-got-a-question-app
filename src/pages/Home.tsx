import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.css'

import { Button } from '../components/Button';

export function Home(){
    const history = useHistory();

    function navigateToNewRoom(){
        history.push('/rooms/new');
    }
    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de <span>Q&amp;A</span> ao vivo</strong>
                <p className="aside-info">Tirar as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="IQAQ - I Got A Question" />
                    <button onClick={navigateToNewRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Criar sala com o Google
                    </button>
                    <div className="separator">Ou entrar em sala já criada</div>
                    <form>
                        <input 
                        type="text"
                        placeholder="Digite o código da sala" />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}