import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import styled from 'styled-components';
import { useState } from 'react';

import { formatPhoneNumber } from 'utils/Parser';

const ContactAvatarChip = (props) => {

  const [showOptions, setShowOptions] = useState(false);

  // const handleClick = () => {

  // }

  const Options = styled.div`
    width: 100%;
    display: ${showOptions ? "flex" : "none"};
    flex-direction: column;
    position: absolute;
    top: 100%;

    button {
      width: 100%;
      text-align: left;
      padding: 10px;
      border: none;
      border-radius: 5px;
      margin-bottom: 10px;
      background-color: #f7f7f7;
      transition: filter .2s;
     
      &:hover {
        filter: brightness(.9)
      }
    }
  `

  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{
        // width: props.width,
        // height: props.height,
        position: "relative",
        padding: "5px",
        border: "1px solid #dadada",
        borderRadius: "5px",
        cursor: "pointer"
      }}
      onClick={() => setShowOptions(!showOptions)}
    >
      <Stack spacing={1} direction="row" justifyContent="center" alignItems="center" >
        <Avatar sx={{ width: 36, height: 36 }} alt={props.fullName} src={props.profileImage || ""} />
        <Chip
          sx={{
            border: "none",
            fontWeight: "700",
            fontSize: "16px",
          }}
          variant="outlined"
          label={props.fullName}
        />
        <span>{props.phone && formatPhoneNumber(props.phone)}</span>
        {showOptions ? <ExpandLess /> : <ExpandMore />}
      </Stack>
      <Options>
        <button>SMS Text</button>
        <button>Personal Text</button>
      </Options>
    </Stack >
  )
}

export default ContactAvatarChip;