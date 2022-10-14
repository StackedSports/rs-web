import React, { useEffect, useState, useMemo, useContext } from 'react'

import SettingsPage from './SettingsPage'
import { AuthContext } from 'Context/Auth/AuthProvider'
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd'
import { IContact } from 'Interfaces/IContact'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { DraggebleRow } from 'UI/Widgets/ContactSettings/DraggebleRow'

type contactKeys =
    'full_name' |
    'first_name' |
    'last_name' |
    'twitter_profile' |
    'dob' |
    'phone' |
    'nick_name' |
    'state' |
    'high_school' |
    'grad_year' |
    'relationships' |
    'opponents' |
    'positions' |
    'area_coach' |
    'position_coach' |
    'coordinator' | //recruiting coach
    'status' |
    'status_2' |
    'tags' |
    'rank' |
    'time_zone';


//type contactKeysType = keyof IContact;

type values = {
    label: string,
    enabled: boolean,
    editable: boolean,
    index: number
}

type labelType = Record<string, values>

type inputType = 'text' | 'select' | 'multi-select' | 'date-picker'


const INITIAL_VALUES: Record<contactKeys, { type: inputType, customizable: boolean }> = {
    full_name: {
        type: 'text',
        customizable: false,
    },
    first_name: {
        type: 'text',
        customizable: false,
    },
    last_name: {
        type: 'text',
        customizable: false,
    },
    twitter_profile: {
        type: 'text',
        customizable: false,
    },
    dob: {
        type: 'date-picker',
        customizable: false,
    },
    phone: {
        type: 'text',
        customizable: false,
    },
    nick_name: {
        type: 'text',
        customizable: true,
    },
    state: {
        type: 'select',
        customizable: true,
    },
    high_school: {
        type: 'text',
        customizable: true,
    },
    grad_year: {
        type: 'text',
        customizable: true,
    },
    relationships: {
        type: 'multi-select',
        customizable: true,
    },
    opponents: {
        type: 'multi-select',
        customizable: true,
    },
    positions: {
        type: 'multi-select',
        customizable: true,
    },
    area_coach: {
        type: 'select',
        customizable: true,
    },
    position_coach: {
        type: 'select',
        customizable: true,
    },
    coordinator: {
        type: 'select',
        customizable: true,
    }, //recruiting coach
    status: {
        type: 'select',
        customizable: true,
    },
    status_2: {
        type: 'select',
        customizable: true,
    },
    tags: {
        type: 'multi-select',
        customizable: true,
    },
    rank: {
        type: 'multi-select',
        customizable: true,
    },
    time_zone: {
        type: 'select',
        customizable: true,
    },
}

const ContactSettingsPage = () => {
    //  const { isAdmin } = useContext(AuthContext)
    const [labels, setLabels] = useState<labelType>()

    const reorder = (list: any[], startIndex: number, endIndex: number) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const onDragEnd = (result: DropResult) => {
        // dropped outside the list
        if (
            !result.destination ||
            result.destination.index === result.source.index
        ) {
            return;
        }

        // no movement
        if (result.destination.index === result.source.index) {
            return;
        }

        /*         const quotes = reorder(
                    this.state.quotes,
                    result.source.index,
                    result.destination.index,
                );
        
                this.setState({
                    quotes,
                }); */
    };

    return (
        <SettingsPage
            title='Contact Settings'
        >
            <DragDropContext onDragEnd={onDragEnd}>

                <Typography fontWeight={'bold'} color='text.secondary'>
                    Showm in table
                </Typography>
                <Droppable droppableId="shown">
                    {(provided: DroppableProvided) => (
                        <Stack
                            gap={2}
                            sx={{ py: 2 }}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <DraggebleRow index={1} id={'1'} />
                            <DraggebleRow index={2} id={'2'} />
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>

                <Typography fontWeight={'bold'} color='text.secondary'>
                    Hidden in table
                </Typography>
                <Droppable droppableId="hidden">
                    {(provided: DroppableProvided) => (
                        <Stack
                            gap={2}
                            sx={{ py: 2 }}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <DraggebleRow index={1} id={'1'} />
                            <DraggebleRow index={2} id={'2'} />
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>

            </DragDropContext>

        </SettingsPage>
    )
}

export default ContactSettingsPage