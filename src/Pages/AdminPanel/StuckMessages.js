import { useState, useEffect, useContext } from 'react'

import { Stack } from '@mui/material'

import MainLayout from 'UI/Layouts/MainLayout'
import MessagePreview from 'UI/Widgets/Messages/MessagePreview'

import { AuthContext } from 'Context/Auth/AuthProvider'
import { AppContext } from 'Context/AppProvider'

import { getStuckMessages, requeueMessage } from 'Api/Endpoints'

const orgWhitelist = [
    "VwGMBbFkBRaW" // Stacked Sports
]

const styles = {
    divider: {
        paddingBottom: 0,
        marginBottom: 20,
        borderBottom: '2px solid #eee'
    }
}

const StuckMessages = () => {
    const { user } = useContext(AuthContext)
    const app = useContext(AppContext)

    // console.log(user)
    // console.log(app)

    if(!user || user.team.org.id !== orgWhitelist[0]) {
        app.redirect('/dashboard')
        return <h1>You don't have access to this page</h1>
    }

    const [stuckMessages, setStuckMessages] = useState({
        loading: true,
        items: null
    })

    useEffect(() => {
        getStuckMessages()
            .then(([res, pagination]) => {
                console.log(res)

                setStuckMessages({
                    items: res,
                    loading: false
                })
            })
    }, [])

    const onRequeueMessage = (messageId) => {
        requeueMessage(messageId)
            .then(res => {
                console.log(res)
                app.alert.setSuccess('Message requeue successfuly!')
            })
            .catch(err => {
                console.log(err)
                app.alert.setError('Message failed to be requeued')
            })
    }

    return (
        <MainLayout
          title='Stuck Messages'
          filtersDisabled
        >
            {!stuckMessages.loading && stuckMessages.items && stuckMessages.items.map(message => (
                <Stack direction="column">
                    <h3 onClick={() => onRequeueMessage(message.id)}>Requeue</h3>
                    <MessagePreview key={message.id} message={message} mini style={styles.divider} link />
                </Stack>
            ))}

            {stuckMessages.loading && <p>Loading...</p>}
            {!stuckMessages.loading && stuckMessages.items.length === 0 && <p>No stuck messages</p>}
        </MainLayout>
    )
}

export default StuckMessages