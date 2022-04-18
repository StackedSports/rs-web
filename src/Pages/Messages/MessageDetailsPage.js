import { useState, useEffect, useRef, useMemo } from 'react'

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import SendIcon from '@mui/icons-material/Send'
import RefreshIcon from '@mui/icons-material/Refresh'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import BaseMessagePage from './BaseMessagePage'
import { useMainLayoutAlert } from 'UI/Layouts/MainLayout'
import ErrorPanel from 'UI/Layouts/ErrorPanel'
import MessagePreview from 'UI/Widgets/Messages/MessagePreview'
import MessageRecipientsTable from 'UI/Tables/Messages/MessageRecipientsTable'
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog'

import { useMessage, useMessageRecipients } from 'Api/Hooks'
import { 
    sendMessage,
    deleteMessage,
    archiveMessage,
    updateMessage,
    addTagsToMessage,
    addTagsToContacts
} from 'Api/Endpoints'

import { messageRoutes } from 'Routes/Routes'

import { getStringListOfIds } from 'utils/Helper'
import { objectNotNull } from 'utils/Validation'

const MessageDetailsPage = (props) => {
    const messageId = useRef(props.match.params.id)
    const [loading, setLoading] = useState(false)

    const [redirect, setRedirect] = useState('')
    const [refresh, setRefresh] = useState(false)
    
    const message = useMessage(messageId.current, refresh)
    const recipients = useMessageRecipients(messageId.current, refresh)

    const [selectedRecipients, setSelectedRecipients] = useState([])

    const alert = useMainLayoutAlert()

    const [displayTagDialog, setDisplayTagDialog] = useState(false)
    const [tagging, setTagging] = useState(null)

    const [errorPanelMessage, setErrorPanelMessage] = useState({ title: 'Media Not Found', body: '' })

    console.log(message.item)
    console.log(recipients.items)

    useEffect(() => {
        if(!message.error)
            return
        
        setErrorPanelMessage({
            title: `${message.error.response.status} ${message.error.response.statusText}`,
            body: message.error.response.data.errors[0].message
        })

    }, [message.error])

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
                alert.setSuccess('Message deleted succesfully!')

                setTimeout(() => {
                    setRedirect(`${messageRoutes.all}`)
                }, 1700)
                
            })
            .catch(error => {
                console.log(error)

                alert.setError('Something happened and we could not delete your message')
            })

    } 
    
    const onArchiveMessageClick = () => {
        console.log('archive message')

        
        console.log(message.item.id)

        // return
        setLoading(true)

        archiveMessage(message.item.id)
            .then(res => {
                console.log(res)
                //setRedirect(`${messageRoutes.all}`)
                // TODO: add success alert
                alert.setSuccess('Message archived successfully!')
            })
            .catch(error => {
                console.log(error)
                alert.setError('We could not archive your message')
            })
            .finally(() => setLoading(false))
    }

    const onUnarchiveMessageClick = () => {
        console.log('unarchive')
    }
    
    const onTagMessageClick = () => {
        console.log('tag message')
        setDisplayTagDialog(true)
        setTagging('message')
    }

    const onSendMessageClick = () => {
        console.log('send')

        // return

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

        sendMessage(message.item.id)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => refreshMessage())
    }

    // TODO: we could parse the message data's recipients object into a format
    // that is more suited for the kinds of things we need to do in the client.
    // This remove recipients function could be optmized because of that.
    const onRemoveRecipients = () => {
        // console.log(selection)

        // console.log(message.item)

        // Making a copy because we are going to change the recipients
        // list content
        let recipients = Object.assign({}, message.item.recipients)
        // let selection = Object.assign([], selectedRecipients)

        console.log(recipients)
        console.log(selectedRecipients)

        let foundFilters = {}
        let totalInFilters = 0

        recipients.filter_list.forEach(filter => {
            let count = 0
            let indices = []

            selectedRecipients.forEach(selectedId => {
                let index = -1

                filter.contacts.every((contact, i) => {
                    if(contact.id === selectedId) {
                        console.log(i)
                        index = i
                        return false
                    }

                    return true
                })

                // console.log(index)
                //let found = filter.contacts.find(contact => contact.id === selectedId)

                if(index !== -1) {
                    totalInFilters++
                    count++
                    indices.push(index)
                }
            })

            if(count > 0) {
                foundFilters[filter.name] = {
                    count,
                    indices
                }
            }
        })

        console.log(foundFilters)
        console.log(totalInFilters)

        let newRecipients = []
        let newFilters = []


        recipients.filter_list.forEach(filter => {
            if(foundFilters[filter.name]) {
                // Current filter holds selected contacts. We need to
                // remove those contacts from its contacts list

                let ids = []

                foundFilters[filter.name].indices.forEach((index, i) => {
                    // console.log('removing ' + index)
                    // let rem = filter.contacts.splice(index - i, 1)
                    // removed = removed.concat(rem)
                    // console.log(filter.contacts)
                    // console.log(rem)

                    ids.push(filter.contacts[index].id)
                })

                filter.contacts.forEach(contact => {
                    let found = ids.find(id => id === contact.id)

                    if(!found)
                        newRecipients.push(contact)
                })

                // console.log(filter.contacts)
                // console.log(removed)
            } else {
                newFilters.push(filter)
            }

            // newRecipients = newRecipients.concat(filter.contacts)
        })

        // console.log('---------')
        // console.log('New Recipients')
        // console.log(newRecipients)

        if(recipients.contact_list && recipients.contact_list.length > 0) {
            // All the contacts to remove belong to filters. So we only
            // need to remove contacts from filters, and we can just copy
            // the ids from recipients.contact_list

            newRecipients.concat(recipients.contact_list)
        }

        let messageData = {
            contact_ids: getStringListOfIds(newRecipients),
            filter_ids: getStringListOfIds(newFilters)
        }

        setLoading(true)

        updateMessage(message.item.id, messageData)
                .then(result => {
                    console.log(result)
                    // let message = result.data
                    
                    alert.setSuccess('Message recipients updated!')

                    setTimeout(() => {
                        refreshMessage()
                    }, 1500)
                })
                .catch(error => {
                    console.log(error)

                    alert.setError('We could not update your message.')
                })
                .finally(() => setLoading(false))
    }

    const refreshMessage = () => {
        // console.log('refreshMessage')
        setRefresh(refresh ? false : true)
    }

    const onSelectedRecipientsChange = (selection) => {
        console.log(selection)
        setSelectedRecipients(selection)
    }

    const onTagContactClick = () => {
        setDisplayTagDialog(true)
        setTagging('recipients')
    }

    const onTagsSelected = (selectedTags) => {
        console.log(selectedRecipients)
        console.log(selectedTags)

        // return

        if(tagging === 'message')
            tagMessage(selectedTags)
        else if(tagging === 'recipients')
            tagRecipients(selectedTags)

        setDisplayTagDialog(false)
        
    }

    const tagMessage = (selectedTags) => {
        setLoading(true)

        addTagsToMessage(selectedTags, message.item.id)
            .then(res => {
                console.log(res)

                alert.setSuccess('Message tagged successfully!')
            })
            .catch(error => {
                console.log(error)
                
                alert.setError('Message could not be tagget')
            })
            .finally(() => setLoading(false))
    }

    const tagRecipients = (selectedTags) => {
        setLoading(true)

        addTagsToContacts(selectedTags, selectedRecipients)
            .then(res => {
                console.log(res)

                if(res.error === 0)
                    alert.setSuccess('Recipients tagged successfully!')
                else
                    alert.setWarning(`${res.success} out of ${res.total} recipients were tagged successfully. ${res.error} recipients failed to be tagged.`)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const onSendNewMessageWithContacts = () => {
        console.log(selectedRecipients)

        // let recipients = []

        // selectedRecipients.forEach(recipientId => {

        // })

        // message.item.recipients

        // localStorage.setItem('')
        let now = Date.now()

        console.log(now)

        localStorage.setItem(`new-message-contact-${now}`, JSON.stringify(selectedRecipients))
        setRedirect(`${messageRoutes.create}/contacts-${now}`)
    }

    const mainActions = useMemo(() => {
        let actions = []

        if(!message.item)
            return actions

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

        const errorOptions = [
            { name: 'Tag', onClick: onTagMessageClick },
            { name: 'Archive', onClick: onArchiveMessageClick }
        ]
        
        // const options = message.item.status === 'Draft' ? draftOptions : sentOptions
        let showAction = false

        switch(message.item.status) {
            case 'Draft':
                options = draftOptions
                showAction = true
                break
            case 'Sent': 
            case 'Completed':
                options = sentOptions
                showAction = true
                break
            case 'Archived':
                options = archivedOptions
                showAction = true
                break
            case 'Error':
                options = errorOptions
                showAction = true
                break
            case 'Deleted':
                break
        }

        let action = { 
            name: 'Action', type: 'dropdown', variant: 'outlined', icon: AutoFixHighIcon,
            options
        }
    
        actions = [
            { name: 'Refresh', variant: 'text', icon: RefreshIcon, onClick: refreshMessage }, // type: icon
        ]

        if(showAction)
            actions.push(action)
    
        if(selectedRecipients.length == 0 && message.item.status === 'Draft') {
            if(now.getTime() > sendDate.getTime()) {
                actions.push({ name: 'Send', variant: 'contained', icon: SendIcon, onClick: onSendMessageClick })
            } else {
                actions.push({ name: 'Schedule', variant: 'contained', icon: EventAvailableIcon, onClick: onScheduleMessageClick })
            }
        } else if(selectedRecipients.length > 0) {
            actions.push({ 
                id: 'Recipients Action',
                name: `${selectedRecipients.length} Recipients Selected`,
                type: 'dropdown',
                variant: 'contained', 
                icon: ArrowDropDownIcon,
                options: [
                    { name: 'Send New Message', onClick: onSendNewMessageWithContacts },
                    { name: 'Tag', onClick: onTagContactClick },
                    // Disconsider bellow message ---.----
                    // For some reason onRemoveRecipients was not referencing the updated
                    // state when onClick received only a reference to the callback
                    // so as a workaround each time selection changes, a new instance of that
                    // callback is called with an updated reference to the selection
                    { name: 'Remove', color: 'red', onClick: onRemoveRecipients },

                ]
            })
        }

        return actions
    }, [message.item, selectedRecipients])

    const hasMedia = useMemo(() => objectNotNull(message.item?.media), [message.item])
    const hasMediaPlaceholder = useMemo(() => objectNotNull(message.item?.media_placeholder), [message.item])

    // console.log(hasMedia)
    // console.log(hasMediaPlaceholder)
    // console.log(hasMedia || hasMediaPlaceholder)

    return (
        <BaseMessagePage
          title='Message Preview'
          topActionName='+ New Message'
          onTopActionClick={onTopActionClick}
          alert={alert}
          actions={mainActions}
          loading={message.loading || loading}
          redirect={redirect}
          onFilterSelected={onFilterSelected}
        >
            <SelectTagDialog
              open={displayTagDialog}
              onClose={() => setDisplayTagDialog(false)}
              onConfirm={onTagsSelected}
            />

            {message.error && (
                <ErrorPanel
                  title={errorPanelMessage.title}
                  body={errorPanelMessage.body}
                />
            )}

            <MessagePreview 
              message={message.item} 
              recipients={recipients.items}
              style={{ marginBottom: 20 }}
            />

            <MessageRecipientsTable 
              selection={selectedRecipients}
              onSelectionChange={onSelectedRecipientsChange}
              platform={message.item?.platform}
              recipients={recipients.items}
              hasCoach={message.item?.send_as_coach}
              hasMedia={hasMedia || hasMediaPlaceholder}
            />


        </BaseMessagePage>
    )
}

export default MessageDetailsPage
