import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import MainLayout, { useMainLayoutAlert } from 'UI/Layouts/MainLayout';

import { useContact } from 'Api/ReactQuery';

import ContactProfileDetails from './ContactProfileDetails';
import ContactMessageDetails from 'UI/Widgets/Contact/ContactMessageDetails';
import ContactChat from 'UI/Widgets/Contact/ContactChat';

export default function ContactsProfilePage(props) {
    const { id } = useParams();

    const [redirect, setRedirect] = useState('')

    const [loading, setLoading] = useState(false)


    const history = useHistory()
    const contact = useContact(id)

    useEffect(() => {
        if (!contact)
            return
        console.log(contact.item)
    }, [id])

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    const onContactUpdated = (newContact) => {
        contact.refetch()
    }

    return (
        <MainLayout
            topActionName='+ New Contact'
            onTopActionClick={onTopActionClick}
            filtersDisabled
            onBackClick={() => history.goBack()}
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
                    contact={contact.item}
                    refreshContact={contact.refetch}
                    onContactUpdated={onContactUpdated}
                />
                <ContactChat contact={contact.item} />
                <ContactMessageDetails
                    contact={contact.item}
                />
            </Stack>
        </MainLayout>
    )
}