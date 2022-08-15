import { List } from '@mui/material';
import Stack from '@mui/material/Stack';
import { TextMessage } from 'UI/Widgets/Chat';


const ContactChatMessages = (props) => {
  const { messages, contact_profile_image, coach_profile_image } = props.messages || {};

  const onCheckMessages = (message) => {
    console.log("check message", message);
  }

  console.log(messages)

  return (
    <List // messages list
      sx={{
        flex: '1 0 0',
        overflowY: 'auto',
        overflowX: 'hidden',
        overscrollBehaviorBlock: 'contain',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        '::-webkit-scrollbar': {
          width: '5px',
          background: 'transparent',
        },

        '::-webkit-scrollbar-thumb': {
          background: (theme) => theme.palette.grey[400],
        }
      }}
    >
      {messages && messages.map(message => (
        <TextMessage
          owner={message.direction === 'out'}
          onCheck={onCheckMessages}
          //checked={isMessageChecked(message)}
          message={message}
          actionActive={false}
          owmnerAvatar={coach_profile_image}
          contactAvatar={contact_profile_image}
        />
      ))}
    </List>
  )
}

export default ContactChatMessages;