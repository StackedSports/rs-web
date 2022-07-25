import { Box, styled } from '@mui/material';
import React, { useMemo } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { getFullName } from 'utils/Parser';
import { KanbanContactItem } from './KanbanContactItem';

export const getBackgroundColor = (isDraggingOver, isDraggingFrom,) => {
    if (isDraggingOver) {
        return '#afafaf';
    }
    if (isDraggingFrom) {
        return '#dadada';
    }
    return 'transparent';
};

const InnerContactList = ({ contacts }) => {
    return contacts.map((contact, index) => (
        <Draggable key={contact.id} draggableId={contact.id} index={index}>
            {(
                dragProvided,
                dragSnapshot,
            ) => (
                <KanbanContactItem
                    key={contact.id}
                    contact={contact}
                    isDragging={dragSnapshot.isDragging}
                    provided={dragProvided}
                />
            )}
        </Draggable>
    ));
};

export const KanbanListItems = (props) => {
    const {
        isDropDisabled,
        listId = 'LIST',
        listType,
        contacts,
        style,
    } = props;

    return (
        <Droppable
            droppableId={listId}
            type={listType}
            isDropDisabled={isDropDisabled}
        >
            {(
                dropProvided,
                dropSnapshot,
            ) => (
                <Wrapper
                    style={style}
                    isDraggingOver={dropSnapshot.isDraggingOver}
                    isDropDisabled={isDropDisabled}
                    isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
                    {...dropProvided.droppableProps}
                    ref={dropProvided.innerRef}
                >
                    <InnerContactList contacts={contacts} />
                    {dropProvided.placeholder}
                </Wrapper>
            )}
        </Droppable>
    )
}

const Wrapper = styled(Box)`
  background-color: ${(props) =>
        getBackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
  padding: 8px;
  border: 8px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 100%;
    flex:1;
`;