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

    const sendMediaInMessage = (media) => {

    }

    const sendMessageToContacts = (contacts) => {

    }

    const sendMessageToRecipients = (recipients) => {
        console.log(recipients)
        // return
        // let now = Date.now()

        // console.log(now)

        let payload = {
            recipients
        }

        localStorage.setItem(`new-message-payload`, JSON.stringify(payload))
        setRedirect(`${messageRoutes.create}/with-payload`)
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    const shouldRedirect = useMemo(() => {
        if(location.pathname !== redirect && redirect !== '')
            return true
        else    
            return false
    }, [location.pathname, redirect])

    const utils = {
        sendMediaInMessage,
        sendMessageToContacts,
        sendMessageToRecipients,
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