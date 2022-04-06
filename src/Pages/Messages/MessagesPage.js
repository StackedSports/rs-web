import { useState, useEffect, useRef } from 'react'

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
            { id: '0', name: 'Scheduled' },
            { id: '1', name: 'In Progress' },
            { id: '2', name: 'Finished' },
            { id: '3', name: 'Archived' },
        ]
    }
]

const MessagesPage = (props) => {
    const [redirect, setRedirect] = useState('')

    const messages = useMessages(1, 25)
    console.log(messages.items)
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
