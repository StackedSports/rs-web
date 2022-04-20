import { useState, useMemo, useEffect, createContext } from 'react'

import { useLocation, Redirect } from 'react-router-dom'

import { messageRoutes } from 'Routes/Routes'

import AuthProvider from './Auth/AuthProvider'

const AppContext = createContext()
AppContext.displayName = 'AppContext'

const AppProvider = (props) => {
    const location = useLocation()
    // console.log(location.pathname)

    const [redirect, setRedirect] = useState('')

    useEffect(() => {
        if(location.pathname === redirect)
            setRedirect('')
            
    }, [location.pathname, redirect])

    const shouldRedirect = useMemo(() => {
        if(location.pathname !== redirect && redirect !== '')
            return true
        else    
            return false
    }, [location.pathname, redirect])

    const callCreateMessageWithPayload = (payload) => {
        localStorage.setItem(`new-message-payload`, JSON.stringify(payload))
        setRedirect(`${messageRoutes.create}/with-payload`)
    }

    const sendMediaInMessage = (media, type) => {
        if(type !== 'media' && type !== 'placeholder')
            return

            
        callCreateMessageWithPayload({ media: { item: media, type }})
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

        if(board.is_shared)
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

    

    const utils = {
        sendMediaInMessage,
        sendMessageToContacts,
        sendMessageToRecipients,
        sendMessageToBoard,
        scrollToTop
    }

    return (
        <AppContext.Provider value={utils}>
            <AuthProvider>
                {shouldRedirect && <Redirect push to={redirect} />}
                {props.children}
            </AuthProvider>
        </AppContext.Provider>
    )
}

export { AppContext }
export default AppProvider