import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import MainLayout, { useMainLayoutAlert } from 'UI/Layouts/MainLayout';


import {
    useBoards,
    useContact,
    useTeamMembers,
} from 'Api/Hooks'



import { contactsRoutes, messageRoutes } from 'Routes/Routes'

import ContactProfileDetails from './ContactProfileDetails';
import ContactMessageDetails from 'UI/Widgets/Contact/ContactMessageDetails';
import ContactChat from 'UI/Widgets/Contact/ContactChat';

export default function ContactsProfilePage(props) {
    const { id } = useParams();

    const [redirect, setRedirect] = useState('')

    const alert = useMainLayoutAlert()

    const [loading, setLoading] = useState(false)

    // handle filters options
    // const positions = usePositions()
    // const peopleTypes = usePeopleTypes()
    // const status = useStatuses()
    // const ranks = useRanks()
    // const tags = useTags2()
    // const teamMembers = useTeamMembers()
    const contact = useContact(id)
    const boards = useBoards()

    const [updatedContact, setUpdatedContact] = useState(null)

    useEffect(() => {
        if (!contact)
            return
        console.log(contact.item)
    }, [id])

    // const contactPositions = useMemo(() => contact?.positions.map(position => {
    //     return {
    //         abbreviation: position.toUpperCase(),
    //     }
    // }), [positions, contact])
    // console.log(contactPositions)

    // const teamMembersItems = teamMembers.items?.map(item => ({ id: item.id, name: `${item.first_name} ${item.last_name}` })) || []



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

    const onContactUpdated = (newContact) => {
        setUpdatedContact(newContact)
    }

    // const onTagsSelected = (selectedTagsIds) => {
    //     // setLoading(true)

    // }

    return (
        <MainLayout
          topActionName='+ New Contact'
          onTopActionClick={onTopActionClick}
          filtersDisabled
          onBackClick={() => { }}
          loading={loading}
          redirect={redirect}
        >
            <Stack
              flex={1}
              direction="row"
              spacing={1}
            >
                <ContactProfileDetails
                  loading={contact.loading}
                  contact={updatedContact || contact.item}
                  refreshContact={() => contact.refreshData()}
                  onContactUpdated={onContactUpdated}
                />
                <ContactChat contact={updatedContact || contact.item} />
                <ContactMessageDetails />
            </Stack>
        </MainLayout>
    )
}