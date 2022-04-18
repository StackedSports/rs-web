import { useState, useEffect, useRef, useMemo } from 'react'

import { useParams } from "react-router-dom"

import BaseMessagePage from './BaseMessagePage'
import MessagePreview from 'UI/Widgets/Messages/MessagePreview'

import { useMessages } from 'Api/Hooks'

const MessagesPage = (props) => {
    const { filter } = useParams()
    const lastFilter = useRef(filter)

    console.log(JSON.parse(localStorage.getItem("user")).token)

    const messageFilter = useMemo(() => {
        if(!filter)
            return null
        else
            return { status: [{ id: filter, name: filter}] }
    }, [filter])

    const [redirect, setRedirect] = useState('')
    // console.log(filter)
    const messages = useMessages(1, 10, messageFilter)
    console.log(messages.items)

    useEffect(() => {
        console.log('on filter')

        console.log(lastFilter.current)
        console.log(filter)

        if(!filter || lastFilter.current === filter)
            return
        
        console.log('filtering for ' + filter)
        lastFilter.current = filter

        messages.filter({ status: [{ id: filter, name: filter}] })
    
    }, [filter])

    return (
        <BaseMessagePage
          redirect={redirect}
        >
            {messages.items && messages.items.map((message, index) => {
                // console.log('rendering message ' + index)
                return (
                    <MessagePreview message={message} mini style={styles.divider} link/>
                )
            })}
        </BaseMessagePage>
    )
}

const styles = {
    divider: {
        paddingBottom: 0,
        marginBottom: 20,
        borderBottom: '2px solid #eee'
    }
}

export default MessagesPage
