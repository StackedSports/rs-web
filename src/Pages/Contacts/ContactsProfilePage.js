import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import MainLayout, { useMainLayoutAlert } from 'UI/Layouts/MainLayout';


import {
    useBoards,
    useTeamMembers,
} from 'Api/Hooks'

import {
    updateContact,
    getContact
} from 'Api/Endpoints'

import { contactsRoutes, messageRoutes } from 'Routes/Routes'

import { formatPhoneNumber } from 'utils/Parser';
import ContactProfileDetails from './ContactProfileDetails';
import ContactMessageDetails from 'UI/Widgets/Contact/ContactMessageDetails';
import ContactChat from 'UI/Widgets/Contact/ContactChat';

export default function ContactsProfilePage(props) {
    const { id } = useParams();

    const [redirect, setRedirect] = useState('')

    const alert = useMainLayoutAlert()

    const [privateBoards, setPrivateBoards] = useState([])
    const [teamBoards, setTeamBoards] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingContact, setLoadingContact] = useState(false)
    const [contact, setContact] = useState(null)


    // handle filters options
    // const positions = usePositions()
    // const peopleTypes = usePeopleTypes()
    // const status = useStatuses()
    // const ranks = useRanks()
    // const tags = useTags2()
    // const teamMembers = useTeamMembers()
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

    // const teamMembersItems = teamMembers.items?.map(item => ({ id: item.id, name: `${item.first_name} ${item.last_name}` })) || []

    const initialValuesForm = {
        //general
        first_name: contact?.first_name || "",
        last_name: contact?.last_name || "",
        nick_name: contact?.nick_name || "",
        phone: contact?.phone ? formatPhoneNumber(contact.phone) : "",
        email: contact?.email,
        twitter_handle: contact?.twitter_profile.screen_name || "",
        //details
        graduation_year: contact?.grad_year || "",
        high_school: contact?.high_school || "",
        state: contact?.state || "",
        status_id: contact?.status?.status || "",
        rank_id: contact?.rank?.rank || "",
        //coaches
        position_coach_id: contact?.position_coach || "",
        recruiting_coach_id: contact?.position_coach || "",
        coordinator_id: contact?.coordinator || "",
        //positions
        position_tags: contact?.positions.map(p => p.toUpperCase()) || "",
        // offense: contact?.positions || "",
        // defense: contact?.positions || "",
        //family&relationship
        relationships: contact?.relationships || "",
        //opponents
        opponents: contact?.opponents || "",
        //external profiles
        hudl_link: contact?.hudl || "",
        arms_id: contact?.arms_id || "",
        //tags
        team_tags: contact?.tags || "",
        //actions
        archived: contact?.archived || false,
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

    const onUpdateContact = (values) => {
        let data = {}

        Object.keys(initialValuesForm).forEach(key => {
            if (initialValuesForm[key] !== values[key]) {
                data[key] = values[key]
            }
        })
        if (Object.keys(data).length > 0)
            updateContact(id, data)
    }

    // let filters = [
    //     { // Category
    //         id: '0',
    //         name: 'All Contacts',
    //         items: [
    //             // Filters
    //             { id: '0', name: 'New (Last 30 days)' },
    //         ]
    //     },
    //     { // Category
    //         id: '1',
    //         name: 'My Boards',
    //         // Filters
    //         items: privateBoards.map(board => ({ id: board.id, name: board.name, path: `${contactsRoutes.board}/${board.id}` }))

    //     },
    //     { // Category
    //         id: '2',
    //         name: 'Shared Boards',
    //         // Filters
    //         items: teamBoards.map(board => ({ id: board.id, name: board.name, path: `${contactsRoutes.board}/${board.id}` }))
    //     },
    //     { // Category
    //         id: '3',
    //         name: 'User Boards',
    //         items: [
    //             // Filters
    //             // { id: '0', name: 'Scheduled' },
    //             // { id: '1', name: 'In Progress' },
    //         ]
    //     },
    // ]

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
                justifyContent="flex-start"
                alignItems="start"
                spacing={1}
            >
                <ContactProfileDetails
                    loadingContact={loadingContact}
                    onUpdateContact={onUpdateContact}
                    initialValuesForm={initialValuesForm}
                />
                <ContactChat contact={contact} />
                <ContactMessageDetails />
            </Stack>
        </MainLayout >
    )
}