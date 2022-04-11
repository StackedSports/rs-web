import { useState, useEffect, useRef, useMemo } from 'react'

import { useParams } from "react-router-dom"
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'

import MainLayout from 'UI/Layouts/MainLayout'
import MessagePreview from 'UI/Widgets/Messages/MessagePreview'

import { useMessages } from 'Api/Hooks'

import { messageRoutes } from 'Routes/Routes'

const filters = [
    { // Category
        id: '0',
        name: 'Messages',
        items: [
            // Filters
            { id: 'draft', name: 'Drafts', path: messageRoutes.filters.drafts },
            { id: '0', name: 'Scheduled', path: messageRoutes.filters.scheduled },
            { id: '1', name: 'In Progress', path: messageRoutes.filters.inProgress },
            { id: '2', name: 'Finished', path: messageRoutes.filters.finished },
            { id: '3', name: 'Archived', path: messageRoutes.filters.archived },
        ]
    }
]

const MessagesPage = (props) => {
    const { filter } = useParams()
    const lastFilter = useRef(filter)

    const messageFilter = useMemo(() => {
        if(!filter)
            return null
        else
            return { status: [{ id: filter, name: filter}] }
    }, [filter])

    const [redirect, setRedirect] = useState('')
    // console.log(filter)
    const messages = useMessages(1, 25, messageFilter)
    // console.log(messages.items)

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

    const onTopActionClick = (e) => {
        console.log('top action click')
        setRedirect(messageRoutes.create)
    }

    const onFilterSelected = (filter, filterIndex, categoryIndex) => {
        console.log('Filter ' + filters[categoryIndex].items[filterIndex].name + ' selected from ' + filters[categoryIndex].name)
    }

    const onActionClick = () => {}

    const onScheduleClick = () => {}

    // const panelActions = [
    //     { name: 'Action', variant: 'outlined', icon: AutoFixHighIcon, onClick: onActionClick },
    //     { name: 'Schedule', variant: 'contained', icon: EventAvailableIcon, onClick: onScheduleClick }

    // ]

    return (
        <MainLayout
          title='Messages'
          topActionName='+ New Message'
          onTopActionClick={onTopActionClick}
          filters={filters}
          redirect={redirect}
          //actions={panelActions}
          onFilterSelected={onFilterSelected}
        >
            {messages.items && messages.items.map((message, index) => {
                // console.log('rendering message ' + index)
                return (
                    <MessagePreview message={message} mini style={styles.divider} link/>
                )
            })}
        </MainLayout>
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
