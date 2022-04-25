import TextareaAutosize from '@mui/base/TextareaAutosize';
import Stack from '@mui/material/Stack';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const ContactChatInput = (props) => {

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
      <TextareaAutosize
        maxRows={4}
        aria-label="type Message to send"
        placeholder="Type Message to send"
        style={{ width: "80%", height: 100, border: "1px solid #dadada", borderRadius: "5px", }}
      />
      <PhotoCameraIcon sx={{ width: 36, height: 36 }} />
      <EmojiEmotionsIcon sx={{ width: 36, height: 36 }} />
    </Stack>
  )
}

export default ContactChatInput;