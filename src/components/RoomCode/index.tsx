import copyImg from 'assets/images/copy.svg'
import './style.css'

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps){

    function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(props.code);
    }

    return (
        <button onClick={copyRoomCodeToClipboard} className="room-code">
            <div>
                <img src={copyImg} alt="Copiar código de sala" />
            </div>
            Sala
            <span>{props.code}</span>
        </button>
    )
}