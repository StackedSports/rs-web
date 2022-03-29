import { useState, useEffect, useRef } from 'react'

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import SendIcon from '@mui/icons-material/Send'
import RefreshIcon from '@mui/icons-material/Refresh';

import MainLayout from 'UI/Layouts/MainLayout'
import MessagePreview from 'UI/Widgets/Messages/MessagePreview'
import MessageRecipientsTable from 'UI/Tables/Messages/MessageRecipientsTable'

import { useMessage } from 'Api/Hooks'
import { sendMessage, filterContacts, deleteMessage, archiveMessage } from 'Api/Endpoints'

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

const MessageDetailsPage = (props) => {
    const messageId = useRef(props.match.params.id)

    const [redirect, setRedirect] = useState('')
    const [refresh, setRefresh] = useState(false)
    
    const message = useMessage(messageId.current, refresh)

    const [panelActions, setPanelActions] = useState([])

    const refreshOnce = useRef(false)

    console.log(message.item)
    
    useEffect(() => {
        if(message.loading || !message.item)
            return
        
        // console.log(message.loading)
        // console.log(message.item)
        console.log('aaa')

        if(message.item.status === 'In Progress' && !refreshOnce.current) { 
            keepRefreshing()
            refreshOnce.current = true
        }

    }, [message])

    const onTopActionClick = (e) => {
        console.log('top action click')

        setRedirect(messageRoutes.create)
    }

    const onFilterSelected = (filter, filterIndex, categoryIndex) => {
        console.log('Filter ' + filters[categoryIndex].items[filterIndex].name + ' selected from ' + filters[categoryIndex].name)
    }

    const onActionClick = () => {}

    const onEditMessageClick = () => {
        console.log('edit message')

        setRedirect(`${messageRoutes.edit}/${message.item.id}`)

        // let data = {
        //     criteria: {
        //         tags: [
        //             'miami'
        //         ]
        //     }
        // }

        // filterContacts(data)
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }

    const onSaveMessageAndExitClick = () => {
        console.log('save and exit')

        setRedirect(`${messageRoutes.all}`)
    }

    const onDeleteMessageClick = () => {
        console.log('delete message')

        console.log(message.item.id)

        // return

        deleteMessage(message.item.id)
            .then(res => {
                console.log(res)
                // setRedirect(`${messageRoutes.all}`)
            })
            .catch(error => {
                console.log(error)
            })

    } 
    
    const onArchiveMessageClick = () => {
        console.log('archive message')

        
        console.log(message.item.id)

        // return

        archiveMessage(message.item.id)
            .then(res => {
                console.log(res)
                setRedirect(`${messageRoutes.all}`)
                // TODO: add success alert
            })
            .catch(error => {
                console.log(error)
            })
    }

    const onUnarchiveMessageClick = () => {
        console.log('unarchive')
    }
    
    const onTagMessageClick = () => {
        console.log('tag message')

    }

    const onSendMessageClick = () => {
        console.log('send')

        sendMessage(message.item.id)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => refreshMessage())
    }

    const onScheduleMessageClick = () => {
        console.log('schedule')

        
    }

    const refreshMessage = () => {
        console.log('refreshMessage')
        setRefresh(refresh ? false : true)
    }

    const keepRefreshing = () => {
        console.log('KeepRefreshing')
        if(!message.item || (message.item === 'Sent' || message.item === 'Error'))
            return

        console.log('Refreshing message')

        setTimeout(() => {
            console.log('on timeout')
            // refreshMessage()
            // keepRefreshing()
        }, 2 * 1000)
    }

    
    let actions = []

    // We should move this to a useEffect so it doenst run on every re-render
    if(message.item) {
        let now = new Date(Date.now())
        let sendDate = new Date(message.item.send_at)

        let options = []

        const draftOptions = [
            { name: 'Edit', onClick: onEditMessageClick },
            { name: 'Save As Draft & Exit', onClick: onSaveMessageAndExitClick },
            { name: 'Delete Message', color: 'red', onClick: onDeleteMessageClick } 
        ]

        const sentOptions = [
            { name: 'Tag', onClick: onTagMessageClick },
            { name: 'Archive', onClick: onArchiveMessageClick }
        ]

        const archivedOptions = [
            { name: 'Tag', onClick: onTagMessageClick },
            { name: 'Unarchive', onClick: onUnarchiveMessageClick }
        ]
        
        // const options = message.item.status === 'Draft' ? draftOptions : sentOptions

        switch(message.item.status) {
            case 'Draft': options = draftOptions; break;
            case 'Sent': options = sentOptions; break;
            case 'Archived': options = archivedOptions; break;
        }
    
        actions = [
            { name: 'Refresh', variant: 'text', icon: RefreshIcon, onClick: refreshMessage }, // type: icon
            { 
                name: 'Action', type: 'dropdown', variant: 'outlined', icon: AutoFixHighIcon,
                options
            },
        ]
    
        if(message.item.status === 'Draft') {
            if(now.getTime() > sendDate.getTime()) {
                actions.push({ name: 'Send', variant: 'contained', icon: SendIcon, onClick: onSendMessageClick })
            } else {
                actions.push({ name: 'Schedule', variant: 'contained', icon: EventAvailableIcon, onClick: onScheduleMessageClick })
            }
        }
        
    }
    // console.log(refresh)

    return (
        <MainLayout
          title='Message Preview'
          topActionName='+ New Message'
          onTopActionClick={onTopActionClick}
          filters={filters}
          actions={actions}
          loading={message.loading}
          redirect={redirect}
          onFilterSelected={onFilterSelected}
        >
            <MessagePreview 
              message={message.item} 
              style={{ marginBottom: 20 }}
            />
            <MessageRecipientsTable 
              platform={message.item?.platform}
              recipients={message.item?.recipients}
            />
        </MainLayout>
    )
}

export default MessageDetailsPage
