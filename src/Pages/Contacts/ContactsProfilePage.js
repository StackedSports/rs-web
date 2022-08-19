import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import MainLayout, { useMainLayoutAlert } from 'UI/Layouts/MainLayout';

import { useContact, useContactAssociatedMedia, useContactSentMedia, useContactConversation, useContactStats } from 'Api/ReactQuery';

import { contactsRoutes, messageRoutes } from 'Routes/Routes'

import ContactProfileDetails from './ContactProfileDetails';
import ContactMessageDetails from 'UI/Widgets/Contact/ContactMessageDetails';
import ContactChat from 'UI/Widgets/Contact/ContactChat';

export default function ContactsProfilePage(props) {
    const { id } = useParams();

    const [redirect, setRedirect] = useState('')

    const [loading, setLoading] = useState(false)


    const history = useHistory()
    const contact = useContact(id)
    const contactAssociatedMedia = useContactAssociatedMedia(id, 1, 20)
    const contactConversation = useContactConversation(id)
    const contactSentMedia = useContactSentMedia(id)
    const contactStats = useContactStats(id)

    //const [updatedContact, setUpdatedContact] = useState(null)

    useEffect(() => {
        if (!contact)
            return
        console.log(contact.item)
    }, [id])

    /*     useEffect(() => {
            if (!contactConversation.item)
                return
            console.log("conversation", contactConversation.item)
        }, [contactConversation.item]) */

    useEffect(() => {
        if (!contactStats.item)
            return
        console.log("stats", contactStats.item)
    }, [contactStats.item])

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
                <ContactChat contact={contact.item} messages={contactConversation.item} />
                <ContactMessageDetails
                    contact={contact.item}
                    sentMedias={contactSentMedia.items}
                    associatedMedias={contactAssociatedMedia.items}
                    stats={contactStats}
                />
            </Stack>
        </MainLayout>
    )
}