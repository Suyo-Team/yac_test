/* import internal modules */
import './styles.css'
import { getDateFromSeconds } from '../../helpers/date'

const ChatMessage = ({ message, nicknameMessage, nicknameRedux }) => {
  const messageClass = nicknameMessage === nicknameRedux ? 'sent' : 'received'

  return (
    <div className={`message ${messageClass}`}>
      <p>
        <span>
          <i className={'infoMessage'}>{`${message.sender} - `}</i>
          <i className={'infoMessage'}>{`${getDateFromSeconds(
            message?.createdAt?.seconds
          )} `}</i>
        </span>
        <br />
        {message.message}
      </p>
    </div>
  )
}

export default ChatMessage
