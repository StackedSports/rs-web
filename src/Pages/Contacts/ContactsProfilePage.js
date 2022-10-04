import React, { useState, useMemo, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import MainLayout, { useMainLayoutAlert } from 'UI/Layouts/MainLayout';

import { useContact } from 'Api/ReactQuery';

import ContactProfileDetails from './ContactProfileDetails';
import ContactMessageDetails from 'UI/Widgets/Contact/ContactMessageDetails';
import ContactChat from 'UI/Widgets/Contact/ContactChat';
import { AppContext } from 'Context/AppProvider';
import CreateContactDialog from 'UI/Widgets/Dialogs/CreateContactDialog';
import { Alert } from '@mui/material';

export default function ContactsProfilePage(props) {
    const app = useContext(AppContext)
    const { id } = useParams();
    const history = useHistory()
    const contact = useContact(id)
    const [openCreateContactDialog, setOpenCreateContactDialog] = useState(false)
    const [openAlert, setOpenAlert] = useState(contact.item?.archived || false)


    const [redirect, setRedirect] = useState('')

    const [loading, setLoading] = useState(false)



    useEffect(() => {
        if (!contact)
            return
        console.log(contact.item)
    }, [id])

    const onTopActionClick = (e) => {
        setOpenCreateContactDialog(true)
    }

    const onContactUpdated = (newContact) => {
        contact.refetch()
    }

    const onContactCreated = () => {
        app.alert.setSuccess('Contact created successfully!')
    }

    return (
        <MainLayout
            topActionName='+ New Contact'
            onTopActionClick={onTopActionClick}
            filtersDisabled
            onBackClick={() => history.goBack()}
            loading={loading}
            redirect={redirect}
            // hideHeader
        >
            {openAlert &&
                <Alert severity="warning" variant="filled" onClose={() => setOpenAlert(false)} sx={{ mb: 1 }}>
                    This contact is archived.
                </Alert>
            }
            <Stack
                flex={1}
                direction="row"
                spacing={1}
                mt={1}
            >
                <ContactProfileDetails
                    loading={contact.loading}
                    contact={contact.item}
                    refreshContact={contact.refetch}
                    isRefetching={contact.isRefetching}
                    onContactUpdated={onContactUpdated}
                />
                <ContactChat contact={contact.item} />
                <ContactMessageDetails
                    contact={contact.item}
                />
            </Stack>

            <CreateContactDialog
                open={openCreateContactDialog}
                onClose={() => setOpenCreateContactDialog(false)}
                onContactCreated={onContactCreated}
            />
        </MainLayout>
    )
}