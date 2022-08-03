import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Box, Stack } from '@mui/material';

export const KanbanWorkspace = (props) => {

    return (
        <Stack direction='row'>
            <DragDropContext onDragEnd={props.onDragEnd}>
                <Droppable
                    droppableId="workspace"
                    direction="horizontal"
                    type="COLUMN"
                >
                    {(provided) => (
                        <Stack direction='row' ref={provided.innerRef} {...provided.droppableProps}>
                            {props.children}
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>
            </DragDropContext>
        </Stack>
    )
}

export default KanbanWorkspace;