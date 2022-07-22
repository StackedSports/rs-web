import { Avatar, Box, Stack, styled, Typography } from '@mui/material';
import React from 'react'
import { getFullName } from 'utils/Parser';

export const KanbanContactItem = (props) => {
    const {
        contact,
        isDragging,
        provided,
    } = props;

    return (
        <Container
            isDragging={isDragging}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <Stack direction='row' alignItems='center' gap={2} >
                <Avatar src={contact.twitter_profile?.profile_image} alt={getFullName(contact)} />
                <Typography fontSize={18}>{getFullName(contact)}</Typography>
            </Stack>
            <Stack direction='row' alignItems='center' gap={1} >
                <Typography fontWeight={600}>{contact.positions.reduce((acc, position) => `${acc} - ${position}`).toUpperCase()}</Typography>
                {'|'}
                <Typography fontWeight={600}>{contact.grad_year}</Typography>
            </Stack>
            <Typography fontSize={14} fontWeight={600}>{`${contact.high_school} HS`}</Typography>
            <Typography fontSize={14} fontWeight={600}> {contact.state}</Typography>
        </Container>
    );
}

const Container = styled(Box)((props) => `
  border-radius: 8px;
  border: 1px solid transparent;
  background-color: ${props.isDragging ? '#dadada' : '#ffff'};
  border-color: ${props.isDragging ? '#afafaf' : '#dadada'};
  box-shadow: ${({ isDragging }) =>
        isDragging ? `2px 2px 1px #f0f` : 'none'};
  box-sizing: border-box;
  padding: 12px;
  margin-bottom: 4px;
  user-select: none;

  &:focus {
    outline: none;
    border-color: #000;
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
  flex-direction: column;
  gap:8px;
`);
