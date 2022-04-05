import { useState, useMemo } from 'react'
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Checkbox, FormControlLabel, TextField, Button, Divider, Typography } from '@mui/material';
import { AccountBox, Tune } from '@material-ui/icons'
import { PanelFilters } from 'UI/Widgets/PanelFilters/PanelFilters';

import { Field, Form, Formik } from 'formik';
import { object, string } from 'yup';


import {
    useContacts,
    useStatus,
    useRanks,
    useGradeYears,
    useBoards,
    useTags,
    usePositions,

} from 'Api/Hooks'

import MainLayout from 'UI/Layouts/MainLayout'
import ContactsTable from 'UI/Tables/Contacts/ContactsTable'


export default function ContactsPage(props) {
    const [contacts, pagination, contactsLoading] = useContacts()
    const [openSaveBoardDialog, setOpenSaveBoardDialog] = useState(false)
    const [selectedContacts, setSelectedContacts] = useState([])
    const [showFilters, setShowFilters] = useState(true)
    const [selectedFilters, setSelectedFilters] = useState({})

    // handle filters options
    const status = useStatus()?.map(item => ({ id: item.id, name: item.status })) || []
    const ranks = useRanks()?.map(item => ({ id: item.id, name: item.rank })) || []
    const gradeYears = useGradeYears()?.map((item, index) => ({ id: index, name: item })) || []
    const tags = useTags() || []
    const positions = usePositions() || []




    const getFiltersData = useMemo(() =>
    ({
        "status": {
            label: 'Status',
            options: status,
            type: 'status'
        },
        "rank": {
            label: 'Rank',
            options: ranks,
        },
        "gradeYear": {
            label: 'Grade Year',
            options: gradeYears,
        },
        "tags": {
            label: 'Tags',
            options: tags,
        },
        "position": {
            label: 'Position',
            options: positions,
        },
    }), [status, ranks, gradeYears, tags, positions])

    const mainActions = [
        {
            name: 'Save as Board',
            icon: AccountBox,
            onClick: () => setOpenSaveBoardDialog(true),
            variant: 'outlined',
            disabled: selectedFilters.length === 0,
        },
        {
            name: 'Filter',
            icon: Tune,
            onClick: () => setShowFilters(oldShowFilter => !oldShowFilter),
            variant: 'contained',
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

    const onFilter = (filter) => {
        console.log('Filter selected', filter)
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


            <PanelFilters
                open={showFilters}
                filters={getFiltersData}
                onFilterChange={onFilter}
            />

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


                    <Formik
                        initialValues={{
                            name: '',
                            isShared: false,
                        }}
                        validationSchema={object().shape({
                            name: string().required('Name is required'),
                        })}
                        onSubmit={(values) => {
                            console.log('submit', values)
                            setOpenSaveBoardDialog(false)
                        }}
                    >
                        {({ isSubmitting, isValid, values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                            <Form>
                                <Field
                                    name="name"
                                    label="Name"
                                    component={TextField}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth

                                    error={touched.name && errors.name}
                                    helperText={touched.name && errors.name}
                                />

                                <Field
                                    name="isShared"
                                    label="Shared"
                                    component={() => (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={values.isShared}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}

                                                    color="primary"
                                                />
                                            }
                                            label="Share with Team"
                                        />
                                    )}
                                />

                            </Form>
                        )}
                    </Formik>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={() => setOpenSaveBoardDialog(false)}
                        color="error"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        type='submit'
                        color="primary"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </MainLayout >
    )
}