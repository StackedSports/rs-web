import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd'
import { Box, Stack, Typography } from '@mui/material'
import { AuthContext } from 'Context/Auth/AuthProvider'
import SettingsPage from './SettingsPage'
import { DraggebleRow } from 'UI/Widgets/ContactSettings/DraggebleRow'
import { ContactConfigModal } from 'UI/Widgets/ContactSettings/ContactConfigModal'
import { ContactSettingsRow } from 'UI/Widgets/ContactSettings/ContactSettingsRow';

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

export type labelValues = {
    id: string,
    label: string,
    enabled: boolean,
    index: number,
    type: inputType,
    customizable: boolean
}
export type inputType = 'text' | 'select' | 'multi-select' | 'date-picker'
type labelType = [contactKeys, labelValues]

const CONFIG_VALUES: [contactKeys, Pick<labelValues, 'customizable' | 'type'>][] = [
    ['full_name', {
        type: 'text',
        customizable: false,
    }],
    ['first_name', {
        type: 'text',
        customizable: false,
    }],
    ['last_name', {
        type: 'text',
        customizable: false,
    }],
    ['twitter_profile', {
        type: 'text',
        customizable: false,
    }],
    ['dob', {
        type: 'date-picker',
        customizable: false,
    }],
    ['phone', {
        type: 'text',
        customizable: false,
    }],
    ['nick_name', {
        type: 'text',
        customizable: true,
    }],
    ['state', {
        type: 'select',
        customizable: true,
    }],
    ['high_school', {
        type: 'text',
        customizable: true,
    }],
    ['grad_year', {
        type: 'text',
        customizable: true,
    }],
    ['relationships', {
        type: 'multi-select',
        customizable: true,
    }],
    ['opponents', {
        type: 'multi-select',
        customizable: true,
    }],
    ['positions', {
        type: 'multi-select',
        customizable: true,
    }],
    ['area_coach', {
        type: 'select',
        customizable: true,
    }],
    ['position_coach', {
        type: 'select',
        customizable: true,
    }],
    ['coordinator', {
        type: 'select',
        customizable: true,
    }], //recruiting coach
    ['status', {
        type: 'select',
        customizable: true,
    }],
    ['status_2', {
        type: 'select',
        customizable: true,
    }],
    ['tags', {
        type: 'multi-select',
        customizable: true,
    }],
    ['rank', {
        type: 'multi-select',
        customizable: true,
    }],
    ['time_zone', {
        type: 'select',
        customizable: true,
    }],
]

const createDefaultValues = (key: contactKeys, config: Pick<labelValues, 'customizable' | 'type'>, index: number): labelValues => ({
    id: uuidv4(),
    ...config,
    enabled: true,
    index: index,
    label: key,
})

const generateDefaultLabels = (): labelType[] => {
    return CONFIG_VALUES.map(
        ([key, values], i) => [key, createDefaultValues(key, values, i)]
    )
}

const ContactSettingsPage = () => {
    //  const { isAdmin } = useContext(AuthContext)
    const [labels, setLabels] = useState<labelType[]>(generateDefaultLabels())
    const [configModalIndex, setConfigModalIndex] = useState<number | null>(null)

    const reorder = (list: labelType[], startIndex: number, endIndex: number): labelType[] => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result.map(([key, value], i) => [key, { ...value, index: i }]);
    }

    useEffect(() => {
        console.log(labels)
    }, [labels])

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

        const reaoderedLabels = reorder(
            labels,
            result.source.index,
            result.destination.index,
        );

        setLabels(reaoderedLabels);
    };

    const onChangeLabel = (data: Partial<labelValues>, index: number | null) => {
        if (index === null) return

        const newLabels: labelType[] = labels.map(([key, value], i) => {
            if (i === index)
                return [key, { ...value, ...data }]
            else
                return [key, value]
        })
        setLabels(newLabels)
        setConfigModalIndex(null)
    }

    const onToggleEnable = (index: number) => {
        const enabled = !labels[index][1].enabled
        onChangeLabel({ enabled: enabled }, index)
    }

    const onOpenConfigModal = (index: number) => {
        setConfigModalIndex(index)
    }

    return (
        <SettingsPage
            title='Contact Settings'
        >
            <DragDropContext onDragEnd={onDragEnd}>

                <Typography fontWeight={'bold'} color='text.secondary' my={1}>
                    Enabled
                </Typography>
                <Droppable droppableId="shown">
                    {(provided: DroppableProvided) => (
                        <Stack
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {
                                labels.filter(label => label[1].enabled).map(([_, values]) =>
                                    <DraggebleRow
                                        values={values}
                                        key={values.id}
                                        onOpenModal={onOpenConfigModal}
                                        onToggleEnable={onToggleEnable}
                                    />
                                )
                            }
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>

                <Typography fontWeight={'bold'} color='text.secondary' my={1}>
                    Disabled
                </Typography>
                <Box>
                    {
                        labels.filter(label => !label[1].enabled).map(([_, values]) =>
                            <ContactSettingsRow
                                values={values}
                                key={values.id}
                                onOpenModal={onOpenConfigModal}
                                onToggleEnable={onToggleEnable}
                            />
                        )
                    }
                </Box>
            </DragDropContext>

            <ContactConfigModal
                open={configModalIndex !== null}
                onClose={() => setConfigModalIndex(null)}
                onSubmit={(form) => onChangeLabel(form, configModalIndex)}
                value={configModalIndex !== null ? labels[configModalIndex][1] : undefined}
            />
        </SettingsPage>
    )
}

export default ContactSettingsPage