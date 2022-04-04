import { useState, useEffect, useRef,useCallback } from 'react'
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Checkbox, Box, FormControlLabel, TextField, Button, Divider, Typography, Collapse, Stack } from '@mui/material';
import { AccountBox, Tune } from '@material-ui/icons'


import {
    useContacts,
    useStatus,
    useRanks,
    useGradeYears,
    useBoards,
    usePositions,

} from 'Api/Hooks'

import MainLayout from 'UI/Layouts/MainLayout'
import ContactsTable from 'UI/Tables/Contacts/ContactsTable'
import FiltersItem from './FiltersItem'



export default function ContactsPage(props) {
    const [contacts, pagination, contactsLoading] = useContacts()
    const [openSaveBoardDialog, setOpenSaveBoardDialog] = useState(false)
    const [selectedContacts, setSelectedContacts] = useState([])
    const [showFilters, setShowFilters] = useState(true)

    const status = useStatus()
    const ranks = useRanks()
    const gradeYears = useGradeYears()
    const boards = useBoards()
    const positions = usePositions()

    console.log("Status: ", status)

   const getFiltersData = useCallback(() => {
        return [
            {
                title: "Status",
                data: status
            },
            {
                title: "Ranks",
                data: ranks
            },
            {
                title: "Grade Years",
                data: gradeYears
            },
            {
                title: "Boards",
                data: boards
            },
            {
                title: "Positions",
                data: positions
            }
        ]
    }, [status, ranks, gradeYears, boards, positions])



    const mainActions = [
        {
            name: 'Save as Board',
            icon: AccountBox,
            onClick: () => setOpenSaveBoardDialog(true),
            variant: 'outlined',
            disabled: selectedContacts.length === 0
        },
        {
            name: 'Filter',
            icon: Tune,
            onClick: () => setShowFilters(oldShowFilter => !oldShowFilter),
            variant: 'outlined',
        }
    ]


    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    let filters = [
        { // Category
            id: '0',
            name: 'My Boards',
            items: [
                // Filters
                { id: '0', name: 'Scheduled' },
                { id: '1', name: 'In Progress' },
                { id: '2', name: 'Finished' },
                { id: '3', name: 'Archived' },
            ]
        }
    ]

    const onFilterSelected = (filter, filterIndex, categoryIndex) => {
        console.log('Filter ' + filters[categoryIndex].items[filterIndex].name + ' selected from ' + filters[categoryIndex].name)
    }




    return (
        <MainLayout
            title='Contacts'
            topActionName='+ New Contact'
            onTopActionClick={onTopActionClick}
            filters={filters}
            onFilterSelected={onFilterSelected}
            actions={mainActions}

        >

            <Collapse in={showFilters}>
                <Stack my={2}>
                    <Box>
                        <FiltersItem title='Status' items={status} />
                    </Box>
                </Stack>
            </Collapse>


            <ContactsTable
                contacts={contacts}
                pagination={pagination}
                loading={contactsLoading}
                onSelectionChange={(selected) => setSelectedContacts(selected)}
            />


            <Dialog
                open={openSaveBoardDialog}
                onClose={() => setOpenSaveBoardDialog(false)}
                aria-labelledby="form-dialog-save-board"
            >
                <DialogTitle
                    sx={{ textAlign: 'center' }}
                    fontWeight='bold'
                >
                    Create Board
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContentText>
                        To save a new board, please enter a name for the board.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="name"
                        label="Board Name"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <FormControlLabel
                        control={<Checkbox value="checkedA" />}
                        label={<Typography color={"text.secondary"} variant="subtitle2">Share with Team</Typography>}
                        sx={{
                            mr: 'auto',
                        }}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => setOpenSaveBoardDialog(false)}
                        color="error"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        onClick={() => setOpenSaveBoardDialog(false)}
                        color="primary"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </MainLayout>
    )
}