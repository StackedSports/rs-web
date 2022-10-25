import React, { useContext, useEffect, useState } from 'react'
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd'
import { Box, Divider, Stack, Typography } from '@mui/material'
import SettingsPage from './SettingsPage'
import { DraggebleRow } from 'UI/Widgets/ContactSettings/DraggebleRow'
import { ContactConfigModal } from 'UI/Widgets/ContactSettings/ContactConfigModal'
import { ContactSettingsRow } from 'UI/Widgets/ContactSettings/ContactSettingsRow';
import { PreferencesContext } from 'Context/PreferencesProvider'

export type contactKeys =
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
export type labelType = [contactKeys, labelValues][]


const ContactSettingsPage = () => {
    const preferences = useContext(PreferencesContext)
    const [configModalIndex, setConfigModalIndex] = useState<number | null>(null)

    if (!preferences) return <></>
    const { labels, setLabels } = preferences

    const enabledLabels = labels.filter(label => label[1].enabled && label[1].customizable)
    const disabledLabels = labels.filter(label => !label[1].enabled)

    const reorder = (list: labelType, startIndex: number, endIndex: number): labelType => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result.map(([key, value], i) => [key, { ...value, index: i }]);
    }

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

    const onChangeLabel = (data: Partial<labelValues>, index: number) => {
        if (index === null) return

        const newLabels: labelType = labels.map(([key, value], i) => {
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

    const onSubmitModal = (data: labelValues) => {
        if (configModalIndex === null) return
        onChangeLabel(data, configModalIndex)
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
                <Droppable droppableId="enabled">
                    {(provided: DroppableProvided) => (
                        <Stack
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            divider={<Divider />}
                        >
                            {
                                enabledLabels.map(([_, values]) =>
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

                {disabledLabels.length > 0 && (
                    <Box
                        mt={2}
                    >
                        <Typography fontWeight={'bold'} color='text.secondary' my={1}>
                            Disabled
                        </Typography>
                        <Stack
                            divider={<Divider />}
                        >
                            {
                                disabledLabels.map(([_, values]) =>
                                    <ContactSettingsRow
                                        values={values}
                                        key={values.id}
                                        onOpenModal={onOpenConfigModal}
                                        onToggleEnable={onToggleEnable}
                                    />
                                )
                            }
                        </Stack>
                    </Box>
                )}

            </DragDropContext>

            <ContactConfigModal
                open={configModalIndex !== null}
                onClose={() => setConfigModalIndex(null)}
                onSubmit={onSubmitModal}
                value={configModalIndex !== null ? labels[configModalIndex][1] : undefined}
            />
        </SettingsPage>
    )
}

export default ContactSettingsPage