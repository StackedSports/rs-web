import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import MainLayout, { useMainLayoutAlert } from 'UI/Layouts/MainLayout';
import AccordionComponent from 'UI/Widgets/Accordion';
import SearchableSelector from 'UI/Forms/Inputs/SearchableSelector'

import {
    // useContacts,
    usePositions,
    usePeopleTypes,
    useStatuses,
    useRanks,
    useGradeYears,
    useBoards,
    useTags,
    useTeamMembers,
    // useUser,
} from 'Api/Hooks'

import {
    // addTagsToContacts,
    // deleteTagToContact,
} from 'Api/Endpoints'

import { contactsRoutes, messageRoutes } from 'Routes/Routes'

import { timeZones, states } from 'utils/Data'
import AccordionContactDetails from 'UI/Forms/Inputs/AccordionContactDetails';
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';

export default function ContactsProfilePage(props) {
    const { id } = useParams();
    const [redirect, setRedirect] = useState('')

    const alert = useMainLayoutAlert()

    // const [openCreateBoardDialog, setOpenCreateBoardDialog] = useState(false)
    // const [selectedContacts, setSelectedContacts] = useState([])
    // const [showPanelFilters, setShowPanelFilters] = useState(false)
    // const [selectedFilters, setSelectedFilters] = useState({})
    const [openSelectTagDialog, setOpenSelectTagDialog] = useState(false)
    const [expandedAccordionId, setExpandedAccordion] = useState();

    const [contactGeneralSaved, setContactGeneralSaved] = useState(false)
    const [privateBoards, setPrivateBoards] = useState([])
    const [teamBoards, setTeamBoards] = useState([])
    const [loading, setLoading] = useState(false)


    // handle filters options
    const positions = usePositions()
    const gradeYears = useGradeYears()
    const peopleTypes = usePeopleTypes()
    const status = useStatuses()
    const ranks = useRanks()
    const tags = useTags()
    const teamMembers = useTeamMembers()
    const boards = useBoards()

    useEffect(() => {
        if (!id)
            return
        console.log(id)
    }, [id])

    useEffect(() => {
        if (!id)
            return
        console.log(id)
    }, [id])

    useEffect(() => {
        if (!positions.items)
            return
        console.log(positions.items)
    }, [positions.items])

    useEffect(() => {
        if (!peopleTypes.items)
            return
        console.log(peopleTypes.items)
    }, [peopleTypes.items])

    useEffect(() => {
        if (!boards.items)
            return

        // console.log(boards.items)
        const privateBoards = boards.items.filter(board => {
            if (!board.is_shared)
                return board
        })
        const teamBoards = boards.items.filter(board => {
            if (board.is_shared)
                return board
        })
        setPrivateBoards(privateBoards)
        setTeamBoards(teamBoards)
    }, [boards.items])


    const teamMembersItems = teamMembers.items?.map(item => ({ id: item.id, name: `${item.first_name} ${item.last_name}` })) || []

    const initialValuesForm = {
        //general
        firstName: "",
        lastName: "",
        nickName: "",
        phone: "",
        email: "",
        twitterHandle: "",
        //details
        gradYear: "",
        school: "",
        state: "",
        stats: "",
        rank: "",
        //coaches
        positionCoach: "",
        areaCoach: "",
        coordinator: "",
        //positions
        offense: "",
        defense: "",
        //family&relationship
        people: "",
        //opponents
        opponents: "",
        //external profiles
        hudl: "",
        armsId: "",
        //tags
        tags: "",
        //actions
        archive: "",
    }


    // const mainActions = [
    //     {
    //         name: 'Save as Board',
    //         icon: AccountBox,
    //         onClick: () => setOpenCreateBoardDialog(true),
    //         variant: 'outlined',
    //         disabled: Object.keys(selectedFilters).length === 0,
    //     },
    //     {
    //         name: 'Filter',
    //         icon: Tune,
    //         onClick: () => setShowPanelFilters(oldShowFilter => !oldShowFilter),
    //         variant: 'contained',
    //     }
    // ]

    // console.log(Object.keys(selectedFilters).length === 0)


    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    const onTagsSelected = (selectedTagsIds) => {
        // setLoading(true)

    }

    let filters = [
        { // Category
            id: '0',
            name: 'All Contacts',
            items: [
                // Filters
                { id: '0', name: 'New (Last 30 days)' },
            ]
        },
        { // Category
            id: '1',
            name: 'My Boards',
            // Filters
            items: privateBoards.map(board => ({ id: board.id, name: board.name, path: `${contactsRoutes.board}/${board.id}` }))

        },
        { // Category
            id: '2',
            name: 'Shared Boards',
            // Filters
            items: teamBoards.map(board => ({ id: board.id, name: board.name, path: `${contactsRoutes.board}/${board.id}` }))
        },
        { // Category
            id: '3',
            name: 'User Boards',
            items: [
                // Filters
                // { id: '0', name: 'Scheduled' },
                // { id: '1', name: 'In Progress' },
            ]
        },
    ]

    return (
        <MainLayout
            // title='Contacts'
            topActionName='+ New Contact'
            onTopActionClick={onTopActionClick}
            // filters={filters}
            // alert={alert}
            // actions={mainActions}
            // onFilterSelected={onFilterSelected}
            loading={loading}
            redirect={redirect}
        >
            <Stack 
              flex={1} 
              direction="row" 
              justifyContent="center" 
              alignItems="start" 
              spacing={1} 
            >
                <Stack 
                //   flex={1} 
                  direction="column" 
                  justifyContent="flex-start" 
                  alignItems="center" 
                  pr={1}
                  spacing={1} 
                  sx={{ width: '300px', height: '100%' }}
                  style={{ borderRight: "#efefef  1px solid" }} >
                    <Formik
                      initialValues={initialValuesForm}
                      onSubmit={(values, actions) => {
                        console.log(values)
                      }}
                    >
                        {({ handleChange, setFieldValue }) => (
                            <Form style={{ flex: 1, width: '100%' }}>
                                <AccordionComponent
                                    id='general'
                                    title='General'
                                    expandedId={expandedAccordionId}
                                    setExpanded={setExpandedAccordion}
                                    items={[
                                        { label: 'First Name', name: 'firstName', component: TextField, onChange: handleChange, setValue: setFieldValue },
                                        { label: 'Last Name', name: 'lastName', component: TextField, onChange: handleChange, setValue: setFieldValue },
                                        { label: 'Nick Name', name: 'nickName', component: TextField, onChange: handleChange, setValue: setFieldValue },
                                        { label: 'Phone Number', name: 'phone', type: "tel", component: TextField, onChange: handleChange, setValue: setFieldValue },
                                        { label: 'Email', name: 'email', type: "email", component: TextField, onChange: handleChange, setValue: setFieldValue },
                                        { label: 'Twitter Handle', name: 'twitterHandle', component: TextField, onChange: handleChange, setValue: setFieldValue },
                                    ]}
                                />
                                <AccordionComponent
                                    id='details'
                                    title='Details'
                                    expandedId={expandedAccordionId}
                                    setExpanded={setExpandedAccordion}
                                    items={[
                                        { label: 'Graduation Year', name: 'gradYear', type: "number", component: TextField, onChange: handleChange, setValue: setFieldValue },
                                        { label: 'Current School', name: 'school', component: TextField, onChange: handleChange, setValue: setFieldValue },
                                        { label: 'State', name: 'state', component: TextField, onChange: handleChange, setValue: setFieldValue },
                                        { label: 'Status', name: 'stats', component: TextField, onChange: handleChange, setValue: setFieldValue },
                                        { label: 'Rank', name: 'rank', component: TextField, onChange: handleChange, setValue: setFieldValue },
                                    ]}
                                />
                                <AccordionComponent
                                  id='coaches'
                                  title='Coaches'
                                  expandedId={expandedAccordionId}
                                  setExpanded={setExpandedAccordion}
                                    // items={[
                                    //     { label: 'Position Coach', name: 'positionCoach', component: TextField, onChange: handleChange, setValue: setFieldValue },
                                    //     { label: 'Area Coach', name: 'areaCoach', component: TextField, onChange: handleChange, setValue: setFieldValue },
                                    //     { label: 'Coordinator', name: 'coordinator', component: TextField, onChange: handleChange, setValue: setFieldValue },
                                    // ]}
                                >
                                    <SearchableSelector
                                      label="Position Coach"
                                      placeholder="Search" 
                                      multiple
                                      value={[]}
                                      options={teamMembers.items || []}
                                      loading={teamMembers.loading}
                                      isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                      getOptionLabel={(option) => option.first_name}
                                      getChipLabel={(option) => {
                                        console.log('ccc', option)
                                        return option.first_name
                                      }}
                                    />
                                </AccordionComponent>
                                <AccordionComponent
                                    id='positions'
                                    title='Positions'
                                    expandedId={expandedAccordionId}
                                    setExpanded={setExpandedAccordion}
                                    items={[
                                        { label: 'Offense', name: 'offense', component: TextField, onChange: handleChange, setValue: setFieldValue },
                                        { label: 'Defense', name: 'defense', component: TextField, onChange: handleChange, setValue: setFieldValue },
                                    ]}
                                />
                                <AccordionComponent
                                    id='family-relationship'
                                    title='Family & Relationship'
                                    expandedId={expandedAccordionId}
                                    setExpanded={setExpandedAccordion}
                                    items={[
                                        { label: 'People', name: 'people', component: TextField, onChange: handleChange, setValue: setFieldValue },
                                    ]}
                                />
                                <AccordionComponent
                                    id='opponents'
                                    title='Opponents'
                                    expandedId={expandedAccordionId}
                                    setExpanded={setExpandedAccordion}
                                    items={[
                                        { label: 'Opponents', name: 'opponents', component: TextField, onChange: handleChange, setValue: setFieldValue },
                                    ]}
                                />
                                <AccordionComponent
                                    id='external-profiles'
                                    title='External Profiles'
                                    expandedId={expandedAccordionId}
                                    setExpanded={setExpandedAccordion}
                                    items={[
                                        { label: 'Hudl', name: 'hudl', component: TextField, onChange: handleChange, setValue: setFieldValue },
                                        { label: 'Arms Id', name: 'armsId', component: TextField, onChange: handleChange, setValue: setFieldValue },
                                    ]}
                                />
                                <AccordionComponent
                                    id='tags'
                                    title='Tags'
                                    expandedId={expandedAccordionId}
                                    setExpanded={setExpandedAccordion}
                                    items={[
                                        { label: 'Tags', name: 'tags', component: TextField, onChange: handleChange, setValue: setFieldValue },
                                    ]}
                                />
                                <AccordionComponent
                                    id='actions'
                                    title='Actions'
                                    expandedId={expandedAccordionId}
                                    setExpanded={setExpandedAccordion}
                                    items={[
                                        { label: 'Archive', name: 'archive', component: TextField, onChange: handleChange, setValue: setFieldValue },
                                    ]}
                                />
                                <button type='submit'>save</button>
                            </Form>
                        )}
                    </Formik>
                </Stack>

                <Stack flex={2} direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
                    second
                </Stack>

                <Stack flex={1} direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
                    third
                </Stack>
            </Stack>
        </MainLayout >
    )
}