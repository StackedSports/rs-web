import { useState, useMemo, useEffect, createContext } from 'react'
import { useLocation, Redirect } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

import { useAlert } from 'Hooks/AlertHooks'

import { messageRoutes } from 'Routes/Routes'

import AuthProvider from './Auth/AuthProvider'
import { ConfirmDialogProvider } from 'Context/ConfirmDialogProvider'

const AppContext = createContext()
AppContext.displayName = 'AppContext'

const AppProvider = (props) => {
    const [windowSize, setWindowSize] = useState({
        width: null,
        height: null
    })
    const location = useLocation()
    const [redirect, setRedirect] = useState('')
    const alert = useAlert()

    useEffect(() => {
        const listener = window.addEventListener('resize', () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        })

        return window.removeEventListener('resize', listener)
    }, [])

    useEffect(() => {
        if (location.pathname === redirect)
            setRedirect('')

    }, [location.pathname, redirect])

    const shouldRedirect = useMemo(() => {
        if (location.pathname !== redirect && redirect !== '')
            return true
        else
            return false
    }, [location.pathname, redirect])

    const callCreateMessageWithPayload = (payload) => {
        localStorage.setItem(`new-message-payload`, JSON.stringify(payload))
        setRedirect(`${messageRoutes.create}/with-payload`)
    }

    const sendMediaInMessage = (media, type) => {
        if (type !== 'media' && type !== 'placeholder')
            return

        callCreateMessageWithPayload({ media: { item: media, type } })
    }

    const sendMessageToContacts = (contacts) => {
        console.log(contacts)

        callCreateMessageWithPayload({ contacts })
    }

    const sendMessageToRecipients = (recipients) => {
        console.log(recipients)

        callCreateMessageWithPayload({ recipients })
    }

    const sendMessageToBoard = (board) => {
        console.log(board)

        let payload = {}

        if (board.is_shared)
            payload['teamBoard'] = board
        else
            payload['privateBoard'] = board

        callCreateMessageWithPayload(payload)
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    const redirectTo = (path) => {
        setRedirect(path)
    }

    const utils = {
        windowSize,
        location,
        alert,
        sendMediaInMessage,
        sendMessageToContacts,
        sendMessageToRecipients,
        sendMessageToBoard,
        scrollToTop,
        redirect: redirectTo
    }

    return (
        <AppContext.Provider value={utils}>
            <AuthProvider>
                <ConfirmDialogProvider>
                    {shouldRedirect && <Redirect push to={redirect} />}

                    {alert && (
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={alert.visible}
                            autoHideDuration={6000}
                            onClose={alert.dismiss}
                        >
                            <MuiAlert
                                variant="filled"
                                onClose={alert.dismiss}
                                severity={alert.severity}
                                sx={{ width: '100%' }}
                            >
                                {alert.message}
                            </MuiAlert>
                        </Snackbar>
                    )}

                    {props.children}
                </ConfirmDialogProvider>
            </AuthProvider>
        </AppContext.Provider>
    )
}

export { AppContext }
export default AppProvider