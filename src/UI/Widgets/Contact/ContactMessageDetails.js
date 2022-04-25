import Stack from '@mui/material/Stack';
import { Typography } from '@material-ui/core';
import CachedIcon from '@mui/icons-material/Cached';
import ContactMessageStats from './ContactMessageStats';
import ContactSentMedia from './ContactSentMedia';
import ContactAssociatedMedia from './ContactAssociatedMedia';

const ContactMessageDetails = (prosp) => {

  const onRefresh = () => {
    console.log("onRefresh")
  }

  return (
    <Stack sx={{ width: "300px" }} spacing={1} alignItems="center" justifyContent="center">
      <ContactMessageStats />
      <ContactSentMedia />
      <ContactAssociatedMedia />
    </Stack>
  )
}

export default ContactMessageDetails;