import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import { Typography } from '@material-ui/core';
import AccordionComponent from 'UI/Widgets/Accordion';
import SearchableSelector from 'UI/Forms/Inputs/SearchableSelector'
import CachedIcon from '@mui/icons-material/Cached';
import LaptopIcon from '@mui/icons-material/Laptop';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import CircularProgress from '@mui/material/CircularProgress';

import Stack from '@mui/material/Stack';

import MainLayout, { useMainLayoutAlert } from 'UI/Layouts/MainLayout';


import {
    // useContacts,
    usePositions,
    usePeopleTypes,
    useStatuses,
    useRanks,
    useGradeYears,
    useBoards,
    useTags2,
    useTeamMembers,
    useContact,
} from 'Api/Hooks'

import {
    // addTagsToContacts,
    // deleteTagToContact,
    updateContact,
    getContact
} from 'Api/Endpoints'

import { contactsRoutes, messageRoutes } from 'Routes/Routes'

import { timeZones, states } from 'utils/Data'
import { formatPhoneNumber } from 'utils/Parser';
import ContactAvatarChip from 'UI/Widgets/ContactAvatarChip';
import FieldMessage from 'UI/Widgets/FieldMessage';
import SentMedia from 'UI/Widgets/SentMedia';
import AssociatedMedia from 'UI/Widgets/AssociatedMedia';

export default function ContactsProfilePage(props) {
    const { id } = useParams();

    const [redirect, setRedirect] = useState('')

    const alert = useMainLayoutAlert()

    const [expandedAccordionId, setExpandedAccordion] = useState()

    const [privateBoards, setPrivateBoards] = useState([])
    const [teamBoards, setTeamBoards] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingContact, setLoadingContact] = useState(false)
    const [contact, setContact] = useState(null)


    // handle filters options
    const positions = usePositions()
    // const gradeYears = useGradeYears()
    const peopleTypes = usePeopleTypes()
    const status = useStatuses()
    const ranks = useRanks()
    const tags = useTags2()
    const teamMembers = useTeamMembers()
    const boards = useBoards()

    useEffect(() => {
        if (!id)
            return

        getContact(id)
            .then(([contact]) => {
                setLoadingContact(true)
                setContact(contact)
                console.log(contact)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoadingContact(false)
            })

    }, [id])

    useEffect(() => {
        if (!ranks.items)
            return
        // console.log(ranks.items)

        if (!status.items)
            return

        // console.log(status.items)
    }, [ranks.items, status.items])

    useEffect(() => {
        if (!positions.items)
            return
        console.log(positions.items)
    }, [positions.items])

    useEffect(() => {
        if (!peopleTypes.items)
            return
        // console.log(peopleTypes.items)
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

    // const contactPositions = useMemo(() => contact?.positions.map(position => {
    //     return {
    //         abbreviation: position.toUpperCase(),
    //     }
    // }), [positions, contact])
    // console.log(contactPositions)

    const teamMembersItems = teamMembers.items?.map(item => ({ id: item.id, name: `${item.first_name} ${item.last_name}` })) || []

    const initialValuesForm = {
        //general
        firstName: contact?.first_name || "",
        lastName: contact?.last_name || "",
        nickName: contact?.nick_name || "",
        phone: contact?.phone ? formatPhoneNumber(contact.phone) : "",
        email: contact?.email,
        twitterHandle: contact?.twitter_profile.screen_name,
        //details
        gradYear: contact?.grad_year || "",
        school: contact?.high_school || "",
        state: contact?.state || "",
        stats: contact?.status || "",
        rank: contact?.rank || "",
        //coaches
        positionCoach: contact?.position_coach || "",
        areaCoach: contact?.position_coach || "",
        coordinator: contact?.coordinator || "",
        //positions
        // positions: contactPositions || "",
        positions: contact?.positions.map(p => p.toUpperCase()) || "",
        // offense: contact?.positions || "",
        // defense: contact?.positions || "",
        //family&relationship
        people: contact?.relationships || "",
        //opponents
        opponents: contact?.opponents || "",
        //external profiles
        hudl: contact?.hudl || "",
        armsId: contact?.arms_id || "",
        //tags
        tags: contact?.tags || "",
        //actions
        archive: contact?.archived || "",
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

    const onUpdateContact = (contact) => {
        // updateContact
        console.log(contact)
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

    const optionsPeriodSelector = [
        {
            id: 0,
            label: "Last 30 Days"
        },
        {
            id: 1,
            label: "This Month"
        },
        {
            id: 2,
            label: "This Quarter"
        },
        {
            id: 3,
            label: "This Year"
        },
        {
            id: 4,
            label: "Last Month"
        },
        {
            id: 5,
            label: "Last Quarter"
        },
        {
            id: 6,
            label: "Last Year"
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
        // showFiltersAtStartup={false}
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
                    sx={{ width: '350px', height: '100%' }}
                    style={{ borderRight: "#efefef  1px solid" }} >
                    {!loadingContact &&
                        <Formik
                            initialValues={initialValuesForm}
                            onSubmit={(values, actions) => {
                                console.log(values)
                            }}
                        >
                            {({ values, handleChange, setFieldValue }) => (
                                <Form style={{ flex: 1, width: '100%' }}>
                                    <Stack
                                        flex={1}
                                        justifyContent="center"
                                        alignItems="start"
                                        spacing={2}
                                    >
                                        <AccordionComponent
                                            id='general'
                                            title='GENERAL'
                                            expandedId={expandedAccordionId}
                                            setExpanded={setExpandedAccordion}
                                            items={[
                                                { label: 'First Name', name: 'firstName', value: values.firstName, component: TextField, onChange: handleChange, setValue: setFieldValue },
                                                { label: 'Last Name', name: 'lastName', value: values.lastName, component: TextField, onChange: handleChange, setValue: setFieldValue },
                                                { label: 'Nick Name', name: 'nickName', value: values.nickName, component: TextField, onChange: handleChange, setValue: setFieldValue },
                                                { label: 'Phone Number', name: 'phone', type: "tel", value: values.phone, component: TextField, onChange: handleChange, setValue: setFieldValue },
                                                { label: 'Email', name: 'email', type: "email", value: values.email, component: TextField, onChange: handleChange, setValue: setFieldValue },
                                                { label: 'Twitter Handle', name: 'twitterHandle', value: values.twitterHandle, component: TextField, onChange: handleChange, setValue: setFieldValue },
                                            ]}
                                        />

                                        <AccordionComponent
                                            id='details'
                                            title='DETAILS'
                                            expandedId={expandedAccordionId}
                                            setExpanded={setExpandedAccordion}
                                            items={[
                                                { label: 'Graduation Year', name: 'gradYear', type: "number", value: values.gradYear, component: TextField, onChange: handleChange, setValue: setFieldValue },
                                                { label: 'Current School', name: 'school', value: values.school, component: TextField, onChange: handleChange, setValue: setFieldValue },
                                                // { label: 'Rank', name: 'rank', values:values.rank ,component: TextField, onChange: handleChange, setValue: setFieldValue },
                                                // { label: 'State', name: 'state', values:values.state ,component: TextField, onChange: handleChange, setValue: setFieldValue },
                                                // { label: 'Status', name: 'stats', values:values.stats ,component: TextField, onChange: handleChange, setValue: setFieldValue },
                                            ]}
                                        >
                                            <SearchableSelector
                                                label="State"
                                                placeholder="Search"
                                                // multiple
                                                value={values.state}
                                                options={states || []}
                                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                                getOptionLabel={(option) => option.abbreviation || values.state || ""}
                                                getChipLabel={(option) => option.abbreviation}
                                                onChange={(newValue) => {
                                                    console.log(newValue)
                                                    setFieldValue("state", newValue)
                                                }}
                                            />

                                            <SearchableSelector
                                                label="Status"
                                                placeholder="Search"
                                                // multiple
                                                value={values.stats}
                                                options={status.items || []}
                                                loading={status.loading}
                                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                                getOptionLabel={(option) => option.status || values.stats.status || ""}
                                                onChange={(newValue) => setFieldValue("stats", newValue)}
                                            />

                                            <SearchableSelector
                                                label="Rank"
                                                placeholder="Search"
                                                // multiple
                                                value={values.rank}
                                                options={ranks.items || []}
                                                loading={ranks.loading}
                                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                                getOptionLabel={(option) => option.rank || values.rank.rank || ""}
                                                getChipLabel={(option) => option.rank}
                                                onChange={(newValue) => setFieldValue("rank", newValue)}
                                            />
                                        </AccordionComponent>

                                        <AccordionComponent
                                            id='coaches'
                                            title='COACHES'
                                            expandedId={expandedAccordionId}
                                            setExpanded={setExpandedAccordion}
                                        // items={[
                                        //   { label: 'Position Coach', name: 'positionCoach', values:values.positionCoach ,component: TextField, onChange: handleChange, setValue: setFieldValue },
                                        //   { label: 'Area Coach', name: 'areaCoach', values:values.areaCoach ,component: TextField, onChange: handleChange, setValue: setFieldValue },
                                        //   { label: 'Coordinator', name: 'coordinator', values:values.coordinator ,component: TextField, onChange: handleChange, setValue: setFieldValue },
                                        // ]}
                                        >
                                            <>
                                                <SearchableSelector
                                                    label="Position Coach"
                                                    placeholder="Search"
                                                    // multiple
                                                    value={values.positionCoach}
                                                    options={teamMembers.items || []}
                                                    loading={teamMembers.loading}
                                                    isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                                    getOptionLabel={(option) => option.first_name || values.positionCoach.first_name || ""}
                                                    getChipLabel={(option) => {
                                                        console.log('ccc', option)
                                                        return option.first_name
                                                    }}
                                                    onChange={(newValue) => setFieldValue("positionCoach", newValue)}
                                                />
                                                <SearchableSelector
                                                    label="Area Coach"
                                                    placeholder="Search"
                                                    // multiple
                                                    value={values.areaCoach}
                                                    options={teamMembers.items || []}
                                                    loading={teamMembers.loading}
                                                    isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                                    getOptionLabel={(option) => option.first_name || values.areaCoach.first_name || ""}
                                                    getChipLabel={(option) => {
                                                        console.log('ccc', option)
                                                        return option.first_name
                                                    }}
                                                    onChange={(newValue) => setFieldValue("areaCoach", newValue)}
                                                />
                                                <SearchableSelector
                                                    label="Coordinator"
                                                    placeholder="Search"
                                                    // multiple
                                                    value={values.coordinator}
                                                    options={teamMembers.items || []}
                                                    loading={teamMembers.loading}
                                                    isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                                    getOptionLabel={(option) => option.first_name || values.coordinator.first_name || ""}
                                                    getChipLabel={(option) => {
                                                        console.log('ccc', option)
                                                        return option.first_name
                                                    }}
                                                    onChange={(newValue) => setFieldValue("coordinator", newValue)}
                                                />
                                            </>
                                        </AccordionComponent>

                                        <AccordionComponent
                                            id='positions'
                                            title='POSITIONS'
                                            expandedId={expandedAccordionId}
                                            setExpanded={setExpandedAccordion}
                                            items={[
                                                // { label: 'Offense', name: 'offense', values:values.offense ,component: TextField, onChange: handleChange, setValue: setFieldValue },
                                                // { label: 'Defense', name: 'defense', values:values.defense ,component: TextField, onChange: handleChange, setValue: setFieldValue },
                                            ]}
                                        >
                                            <SearchableSelector
                                                label="Positions"
                                                placeholder="Search"
                                                multiple
                                                value={values.positions}
                                                options={positions.items || []}
                                                loading={positions.loading}
                                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                                getOptionLabel={(option) => option.abbreviation || option || ""}
                                                getChipLabel={(option) => {
                                                    return option.abbreviation || option
                                                }}
                                                onChange={(newValue) => {
                                                    const positions = newValue.map(position => position.abbreviation || position)
                                                    setFieldValue("positions", positions)
                                                }}
                                            />
                                        </AccordionComponent>

                                        <AccordionComponent
                                            id='family-relationship'
                                            title='FAMILY & RELATIONSHIP'
                                            expandedId={expandedAccordionId}
                                            setExpanded={setExpandedAccordion}
                                            items={[
                                                { label: 'People', name: 'people', value: values.people, component: TextField, onChange: handleChange, setValue: setFieldValue },
                                            ]}
                                        >
                                            {/* <SearchableSelector
                                            label="People"
                                            placeholder="Search"
                                            multiple
                                            value={values.people}
                                            options={peopleTypes.items || []}
                                            loading={peopleTypes.loading}
                                            isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                            getOptionLabel={(option) => option.description}
                                            getChipLabel={(option) => {
                                                return option.description
                                            }}
                                            onChange={(newValue) => setFieldValue("people", newValue)}
                                        /> */}
                                        </AccordionComponent>

                                        <AccordionComponent
                                            id='opponents'
                                            title='OPPNENTS'
                                            expandedId={expandedAccordionId}
                                            setExpanded={setExpandedAccordion}
                                            items={[
                                                { label: 'Opponents', name: 'opponents', value: values.opponents, component: TextField, onChange: handleChange, setValue: setFieldValue },
                                            ]}
                                        />
                                        <AccordionComponent
                                            id='external-profiles'
                                            title='EXTERNAL PROFILES'
                                            expandedId={expandedAccordionId}
                                            setExpanded={setExpandedAccordion}
                                            items={[
                                                { label: 'Hudl', name: 'hudl', value: values.hudl, component: TextField, onChange: handleChange, setValue: setFieldValue },
                                                { label: 'Arms Id', name: 'armsId', value: values.armsId, component: TextField, onChange: handleChange, setValue: setFieldValue },
                                            ]}
                                        />
                                        <AccordionComponent
                                            id='tags'
                                            title='TAGS'
                                            expandedId={expandedAccordionId}
                                            setExpanded={setExpandedAccordion}
                                        // items={[
                                        //     { label: 'Tags', name: 'tags', values:values.tags ,component: TextField, onChange: handleChange, setValue: setFieldValue },
                                        // ]}
                                        >
                                            <SearchableSelector
                                                label="Tags"
                                                placeholder="Search"
                                                multiple
                                                value={values.tags}
                                                options={tags.items || []}
                                                loading={tags.loading}
                                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                                getOptionLabel={(option) => option.name || ""}
                                                getChipLabel={(option) => {
                                                    return option.name
                                                }}
                                                onChange={(newValue) => setFieldValue("tags", newValue)}
                                            />
                                        </AccordionComponent>

                                        <AccordionComponent
                                            id='actions'
                                            title='ACTIONS'
                                            expandedId={expandedAccordionId}
                                            setExpanded={setExpandedAccordion}
                                            items={[
                                                { label: 'Archive', name: 'archive', value: values.archive, component: TextField, onChange: handleChange, setValue: setFieldValue },
                                            ]}
                                        />
                                    </Stack>
                                    <button type='submit'>save</button>
                                </Form>
                            )}
                        </Formik>
                    }
                </Stack>

                <Stack sx={{ width: 550, height: "100vh" }} justifyContent="flex-start" alignItems="start" spacing={1}>
                    <ContactAvatarChip
                        fullName={contact?.first_name + " " + contact?.last_name}
                        profileImage={contact?.twitter_profile.profile_image}
                        phone={contact?.phone}
                    />
                    <Stack flex={2} justifyContent="flex-start" alignItems="center" spacing={1}>

                    </Stack>
                    <FieldMessage />
                </Stack>

                <Stack sx={{ width: 300 }} justifyContent="flex-start" alignItems="center" spacing={2}>
                    <Stack sx={{ width: "100%" }} flex={1} justifyContent="flex-start" alignItems="center" spacing={2}>
                        <Stack sx={{ width: "100%" }} flex={1} direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                            <Typography align='left' variant='subtitle1' component="p">
                                Message Stats
                            </Typography>
                            <CachedIcon />
                        </Stack>
                        <CircularProgress sx={{ width: 36, height: 36 }} />
                        <Stack sx={{ width: "100%" }} direction="row" flex={2} justifyContent="space-evenly" alignItems="center" spacing={1}>
                            <Stack justifyContent="space-between" alignItems="center" spacing={1}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <LaptopIcon />
                                    <span>DMS's</span>
                                </div>
                                <span style={{ color: "blue", fontSize: "25px", fontWeight: "700" }}>0</span>
                            </Stack>
                            <Stack justifyContent="space-between" alignItems="center" spacing={1}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <SmartphoneIcon />
                                    <span>Personal Text</span>
                                </div>
                                <span style={{ color: "red", fontSize: "25px", fontWeight: "700" }}>0</span>
                            </Stack>
                            <Stack justifyContent="space-between" alignItems="center" spacing={1}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <SmartphoneIcon />
                                    <span>RS Text</span>
                                </div>
                                <span style={{ color: "yellow", fontSize: "25px", fontWeight: "700" }}>0</span>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack sx={{ width: "100%" }} direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                        <SearchableSelector
                            // label="State"
                            // placeholder="Search"
                            // multiple
                            value={optionsPeriodSelector[0]}
                            options={optionsPeriodSelector}
                            isOptionEqualToValue={(option, value) => option?.id === value?.id}
                            getOptionLabel={(option) => option.label || ""}
                            getChipLabel={(option) => option.label}
                            onChange={(newValue) => {
                                console.log(newValue)
                            }}
                        />
                        <span style={{ fontSize: "12px" }}>Last Communication : 3 hrs ago</span>
                    </Stack>

                    <SentMedia />
                    <AssociatedMedia />
                </Stack>
                
            </Stack>
        </MainLayout >
    )
}