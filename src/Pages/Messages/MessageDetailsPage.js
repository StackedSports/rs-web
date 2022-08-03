import { useState, useEffect, useRef, useMemo, useContext } from 'react'
import { useQueryClient } from 'react-query'

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import SendIcon from '@mui/icons-material/Send'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import RefreshIcon from '@mui/icons-material/Refresh'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import BaseMessagePage from './BaseMessagePage'
import { useMainLayoutAlert } from 'UI/Layouts/MainLayout'
import ErrorPanel from 'UI/Layouts/ErrorPanel'
import MessagePreview from 'UI/Widgets/Messages/MessagePreview'
import MessageRecipientsTable from 'UI/Tables/Messages/MessageRecipientsTable'
import SelectTagDialog from 'UI/Widgets/Tags/SelectTagDialog'

import { AppContext } from 'Context/AppProvider'
import useMultiPageSelection from 'Hooks/MultiPageSelectionHook'

import { useMessage, useMessageRecipients } from 'Api/ReactQuery';
import {
    sendMessage,
    deleteMessage,
    archiveMessage,
    updateMessage,
    removeRecipients,
    addTagsToMessage,
    addTagsToContacts,
    cancelMessage,
    addTagsToContactsWithNewTags,
    addTagsToMessagesWithNewTags,
} from 'Api/Endpoints'

import { messageRoutes } from 'Routes/Routes'

import { getStringListOfIds } from 'utils/Helper'
import { objectNotNull } from 'utils/Validation'

const MessageDetailsPage = (props) => {
    const app = useContext(AppContext)

    const messageId = useRef(props.match.params.id)
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState('')

    const message = useMessage(messageId.current)
    const recipients = useMessageRecipients(messageId.current, 1, 50)

    const selectedRecipients = useMultiPageSelection(recipients.pagination.currentPage)
    // const [selectedRecipients.items, setSelectedRecipients] = useState([])

    const alert = useMainLayoutAlert()

    const [displayTagDialog, setDisplayTagDialog] = useState(false)
    const [tagging, setTagging] = useState(null)

    const [errorPanelMessage, setErrorPanelMessage] = useState({ title: 'Media Not Found', body: '' })

    // console.log(message.item)
    // console.log(recipients.items)

    useEffect(() => {
        if (!message.error)
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

    const onEditMessageClick = () => {
        console.log('edit message')
        setRedirect(`${messageRoutes.edit}/${message.item.id}`)
    }

    const onSaveMessageAndExitClick = () => {
        console.log('save and exit')

        setRedirect(`${messageRoutes.all}`)
    }

    const onCancelMessage = (e) => {
        console.log("onCancelMessage", messageId.current)

        setLoading(true)

        cancelMessage(messageId.current)
            .then(res => {
                console.log(res)
                alert.setSuccess('Message canceled!')
            })
            .catch(error => {
                console.log(error)
                alert.setError('Error canceling message.')
            })
            .finally(() => {
                setLoading(false)
                refreshMessage()
            })
    }

    const onDeleteMessageClick = () => {
        console.log('delete message')

        console.log(message.item.id)

        // return

        deleteMessage(message.item.id)
            .then(res => {
                console.log(res)
                alert.setSuccess('Message deleted succesfully!')
                useQueryClient().invalidateQueries('messages')

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
                alert.setError('We could not archive your message.')
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

        sendMessage(message.item)
            .then(res => {
                console.log(res)
                alert.setSuccess('Message queued successfully!')
            })
            .catch(error => {
                console.log(error)
                alert.setError('Failed to send the message.')
            })
            .finally(() => refreshMessage())
    }

    const onScheduleMessageClick = () => {
        console.log('schedule')

        sendMessage(message.item)
            .then(res => {
                console.log(res)
                alert.setSuccess('Message scheduled successfully!')
            })
            .catch(error => {
                console.log(error)
                alert.setError('Failed to schedule message.')
            })
            .finally(() => refreshMessage())
    }

    const onRemoveRecipients = () => {
        setLoading(true)

        removeRecipients(message.item.id, selectedRecipients.items)
            .then(result => {
                console.log(result)
                // let message = result.data

                if (result.successCount === 0) {
                    alert.setError('Could not remove recipients')
                } else {
                    if (result.errorCount === 0)
                        alert.setSuccess('Recipients removed successfully!')
                    else
                        alert.setWarning(`${result.successCount} recipients removed successfully. `
                            + `${result.errorCount} recipeints failed to be removed.`)


                    refreshMessage()
                }
            })
            .catch(error => {
                console.log(error)

                alert.setError('Could not remove recipients')
            })
            .finally(() => setLoading(false))

    }

    const refreshMessage = () => {
        selectedRecipients.clear()
        message.refetch()
        recipients.refetch()
    }

    const onSelectedRecipientsChange = (selection) => {
        console.log(selection)
        selectedRecipients.onSelectionChange(selection)
    }

    const onTagContactClick = () => {
        setDisplayTagDialog(true)
        setTagging('recipients')
    }

    const onTagsSelected = (selectedTags) => {
        console.log(selectedRecipients.items)
        console.log(selectedTags)

        // return

        if (tagging === 'message')
            tagMessage(selectedTags)
        else if (tagging === 'recipients')
            tagRecipients(selectedTags)

        setDisplayTagDialog(false)

    }

    const tagMessage = (selectedTags) => {
        setLoading(true)

        addTagsToMessagesWithNewTags(selectedTags, message.item.id)
            .then(res => {
                console.log(res)

                alert.setSuccess('Message tagged successfully!')
            })
            .catch(error => {
                console.log(error)

                alert.setWarning('One or more tags could not be added to the message. Try again.')
            })
            .finally(() => setLoading(false))
    }

    const tagRecipients = async (selectedTags) => {
        setLoading(true)

        const res = await addTagsToContactsWithNewTags(selectedTags, selectedRecipients.items)
        if (res.error.count === 0)
            alert.setSuccess('Recipients tagged successfully!')
        else
            alert.setWarning(`${res.success.count} out of ${selectedRecipients.items.length} recipients were tagged successfully. ${res.error.count} recipients failed to be tagged.`)

        setLoading(false)
    }

    const onSendNewMessageWithContacts = () => {
        let tmp = []

        if (recipients.items.filter_list)
            recipients.items.filter_list.forEach(filter => {
                tmp = tmp.concat(filter.contacts)
            })

        if (recipients.items.contact_list)
            tmp = tmp.concat(recipients.items.contact_list)

        selectedRecipients.saveData(tmp)

        // console.log(selectedRecipients.items)
        // return

        let data = selectedRecipients.getDataSelected()
        console.log(data)

        if (data) {
            app.sendMessageToRecipients(data)
        }
    }

    const onRecipientsPageChange = (page) => {
        // save data from mpSelection

        // TODO: recipients.items is an object and not an array
        // { count, contact_list, filter_list, status_count }
        // TODO: we need to either parse useMessageRecipients response
        // or do a manual parse here
        let tmp = []

        if (recipients.items.filter_list)
            recipients.items.filter_list.forEach(filter => {
                tmp = tmp.concat(filter.contacts)
            })

        if (recipients.items.contact_list)
            tmp = tmp.concat(recipients.items.contact_list)

        selectedRecipients.saveData(tmp)

        recipients.pagination.getPage(page)
        // call get next page
    }

    const mainActions = useMemo(() => {
        let actions = []

        if (!message.item)
            return actions

        let now = new Date(Date.now())
        let sendDate = new Date(message.item.send_at)

        let options = []

        const draftOptions = [
            { name: 'Edit', onClick: onEditMessageClick },
            { name: 'Save As Draft & Exit', onClick: onSaveMessageAndExitClick },
            { name: 'Delete Message', color: 'red', onClick: onDeleteMessageClick }
        ]

        const commonOptions = [
            { name: 'Tag', onClick: onTagMessageClick },
            { name: 'Archive', onClick: onArchiveMessageClick }
        ]

        // const options = message.item.status === 'Draft' ? draftOptions : sentOptions
        let showAction = false

        switch (message.item.status) {
            case 'Draft':
                options = draftOptions
                showAction = true
                break
            case 'Sent':
            case 'Completed':
            case 'Archived':
            case 'Error':
            case 'Cancelled':
                options = commonOptions
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

        if (showAction)
            actions.push(action)

        if (selectedRecipients.count == 0 && message.item.status === 'Draft') {
            if (now.getTime() > sendDate.getTime()) {
                actions.push({ name: 'Send', variant: 'contained', icon: SendIcon, onClick: onSendMessageClick })
            } else {
                actions.push({ name: 'Schedule', variant: 'contained', icon: EventAvailableIcon, onClick: onScheduleMessageClick })
            }
        } else if (selectedRecipients.count > 0) {
            let recipientActions = {
                id: 'Recipients Action',
                name: `${selectedRecipients.count} Recipients Selected`,
                type: 'dropdown',
                variant: 'contained',
                icon: ArrowDropDownIcon,
                disabled: recipients.loading,
                options: [
                    { name: 'Send New Message', onClick: onSendNewMessageWithContacts },
                    { name: 'Tag', onClick: onTagContactClick },
                ]
            }

            if (message.item.status === 'Draft')
                recipientActions.options.push({
                    name: 'Remove', color: 'red', onClick: onRemoveRecipients
                })

            actions.push(recipientActions)
        }

        if (message.item.status === 'In Progress' || message.item.status === 'Pending') {
            actions.push({ name: 'Cancel Message', variant: 'contained', icon: CancelScheduleSendIcon, onClick: onCancelMessage })
            actions.push({ name: 'Edit', onClick: onEditMessageClick, variant: 'contained', icon: ModeEditIcon })
        }

        return actions
    }, [message.item, selectedRecipients.items, selectedRecipients.count])

    const hasMedia = useMemo(() => objectNotNull(message.item?.media), [message.item])
    const hasMediaPlaceholder = useMemo(() => objectNotNull(message.item?.media_placeholder), [message.item])

    // console.log(hasMedia)
    // console.log(hasMediaPlaceholder)
    // console.log(hasMedia || hasMediaPlaceholder)

    console.log(message.item)

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
                isAddTag
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
                loading={message.loading}
            />

            <MessageRecipientsTable
                selection={selectedRecipients.items}
                onSelectionChange={onSelectedRecipientsChange}
                platform={message.item?.platform}
                recipients={recipients.items}
                loading={!message.loading && recipients.loading}
                hasCoach={message.item?.send_as_coach}
                hasMedia={hasMedia || hasMediaPlaceholder}
                pagination={recipients.pagination}
                onPageChange={onRecipientsPageChange}
            />
        </BaseMessagePage>
    )
}

export default MessageDetailsPage