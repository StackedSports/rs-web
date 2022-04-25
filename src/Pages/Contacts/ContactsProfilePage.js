import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import MainLayout, { useMainLayoutAlert } from 'UI/Layouts/MainLayout';


import {
    useBoards,
    useContact,
    useTeamMembers,
} from 'Api/Hooks'

import {
    updateContact,
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

    // handle filters options
    // const positions = usePositions()
    // const peopleTypes = usePeopleTypes()
    // const status = useStatuses()
    // const ranks = useRanks()
    // const tags = useTags2()
    // const teamMembers = useTeamMembers()
    const contact = useContact(id)
    const boards = useBoards()

    useEffect(() => {
        if (!contact)
            return
        console.log(contact.item)
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
        first_name: contact.item?.first_name || "",
        last_name: contact.item?.last_name || "",
        nick_name: contact.item?.nick_name || "",
        phone: contact.item?.phone ? formatPhoneNumber(contact.item.phone) : "",
        email: contact.item?.email,
        twitter_handle: contact.item?.twitter_profile?.screen_name || "",
        //details
        graduation_year: contact.item?.grad_year || "",
        high_school: contact.item?.high_school || "",
        state: contact.item?.state || "",
        status_id: contact.item?.status?.status || "",
        rank_id: contact.item?.rank?.rank || "",
        //coaches
        position_coach_id: contact.item?.position_coach?.first_name || "",
        recruiting_coach_id: contact.item?.position_coach?.first_name || "",
        coordinator_id: contact.item?.coordinator?.first_name || "",
        //positions
        position_tags: contact.item?.positions?.map(p => p.toUpperCase()) || "",
        // offense: contact.item?.positions || "",
        // defense: contact.item?.positions || "",
        //family&relationship
        relationships: contact.item?.relationships || "",
        //opponents
        opponents: contact.item?.opponents || "",
        //external profiles
        hudl_link: contact.item?.hudl || "",
        arms_id: contact.item?.arms_id || "",
        //tags
        team_tags: contact.item?.tags || "",
        //actions
        archived: contact.item?.archived || false,
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

    // const onTagsSelected = (selectedTagsIds) => {
    //     // setLoading(true)

    // }

    const onUpdateContact = (values) => {
        let data = {}

        Object.keys(initialValuesForm).forEach(key => {
            if (initialValuesForm[key] !== values[key]) {
                data[key] = values[key].toString()
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
                    loadingContact={contact.loading}
                    onUpdateContact={onUpdateContact}
                    initialValuesForm={initialValuesForm}
                />
                <ContactChat contact={contact.item} />
                <ContactMessageDetails />
            </Stack>
        </MainLayout >
    )
}