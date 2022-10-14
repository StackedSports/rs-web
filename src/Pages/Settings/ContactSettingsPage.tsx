import React, { useEffect, useState, useMemo, useContext } from 'react'

import SettingsPage from './SettingsPage'
import { AuthContext } from 'Context/Auth/AuthProvider'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { IContact } from 'Interfaces/IContact'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const CONTATCT_KEYS: contactKeysType[] = [
    'advisor',
    'archived',
    'area_coach',
    'arms_id',
    'associated_media',
    'coordinator',
    'dob',
    'email',
    'ets_code',
    'first_name',
    'grad_year',
    'high_school',
    'hudl',
    'id',
    'instagram_handle',
]

type contactKeysType = keyof IContact;

type values = {
    label: string,
    enabled: boolean,
    editable: boolean,
    index: number
}

type labelType = Record<contactKeysType, values>

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

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow
                                key={'row.name'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {'row.name'}
                                </TableCell>
                                <TableCell align="right">{'row.calories'}</TableCell>
                                <TableCell align="right">{'row.fat'}</TableCell>
                                <TableCell align="right">{'row.carbs'}</TableCell>
                                <TableCell align="right">{'row.protein'}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>

            </DragDropContext>

        </SettingsPage>
    )
}

export default ContactSettingsPage