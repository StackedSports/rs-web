import React from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'

import { labelValues } from 'Pages/Settings/ContactSettingsPage';
import { ContactSettingsRow } from './ContactSettingsRow';

interface DraggebleRowProps {
    onOpenModal: (index: number) => void,
    onToggleEnable: (index: number) => void,
    values: labelValues
}

export const DraggebleRow: React.FC<DraggebleRowProps> = (props) => {


    return (
        <Draggable
            draggableId={props.values.id}
            index={props.values.index}
            isDragDisabled={true}
        >
            {(
                provided: DraggableProvided,
                //snapshot: DraggableStateSnapshot,
            ) => (

                <ContactSettingsRow {...props} dndProvide={provided} />
            )}
        </Draggable>
    )
}
