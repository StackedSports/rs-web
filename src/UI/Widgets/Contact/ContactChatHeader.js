import { useState, useRef } from 'react';
import { Avatar, Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { formatPhoneNumber, getFullName } from 'utils/Parser';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const ContactChatHeader = (props) => {

  const fullName = props.contact ? getFullName(props.contact) : "Loading..."
  const profileImage = props.contact?.twitter_profile.profile_image
  const phone = props.contact ? props.contact.phone : "Loading..."

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <Stack spacing={1} direction="row" justifyContent="start" alignItems="center">
      <Button
        variant="outlined"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        ref={anchorRef}
        onClick={handleToggle}
        startIcon={<Avatar sx={{ width: 36, height: 36 }} alt={fullName} src={profileImage} />}
        endIcon={open ? <ExpandLess /> : <ExpandMore />}
        size="large"
      >
        {fullName}
        {phone && <Typography variant="body2" sx={{ pl: 2 }}>{formatPhoneNumber(phone)}</Typography>}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ zIndex: 'fab' }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper
              sx={{
                minWidth: anchorRef.current?.offsetWidth || 'fit-content',
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>SMS Text</MenuItem>
                  <MenuItem onClick={handleClose}>Personal Text</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Stack>
  )
}

export default ContactChatHeader;