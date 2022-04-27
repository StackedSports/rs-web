import { useState, useEffect, useRef, useMemo } from 'react'

import { useParams } from "react-router-dom"
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import { Tune } from '@mui/icons-material'

import BaseMessagePage from './BaseMessagePage'
import MessagePreview from 'UI/Widgets/Messages/MessagePreview'
import LoadingOverlay from 'UI/Widgets/LoadingOverlay'
import ErrorPanel from 'UI/Layouts/ErrorPanel'

import { useMessages } from 'Api/Hooks'

const getTitle = (filterName) => {
    switch (filterName) {
        case 'drafts': return 'Drafts'
        case 'pending': return 'Scheduled'
        case 'in_progress': return 'In Progress'
        case 'finished': return 'Finished'
        case 'error': return 'Error'
        default: return 'All Messages'
    }
}

const MessagesPage = (props) => {
    const { filter } = useParams()
    const lastFilter = useRef(filter)
    const [showPanelFilters, setShowPanelFilters] = useState(false)

    // console.log(JSON.parse(localStorage.getItem("user")).token)

    const messageFilter = useMemo(() => {
        console.log(filter)
        if (!filter)
            return { status: 'all' }
        else if (filter === 'finished')
            return { status: 'finished' }
        else
            return { status: [{ id: filter, name: filter }] }
    }, [filter])

    const [redirect, setRedirect] = useState('')
    // console.log(filter)
    const messages = useMessages(1, 10, messageFilter)

    const [errorPanelMessage, setErrorPanelMessage] = useState({ title: 'Something Went Wrong', body: '' })

    // console.log(messages.items)

    useEffect(() => {
        console.log('on filter')

        console.log(lastFilter.current)
        console.log(filter)

        if (!filter || lastFilter.current === filter)
            return

        console.log('filtering for ' + filter)
        lastFilter.current = filter

        messages.filter({ status: [{ id: filter, name: filter }] })

    }, [filter])

    useEffect(() => {
        if (!messages.error)
            return

        Object.keys(messages.error).forEach(key => {
            console.log(key)
            console.log(messages.error[key])
        })

        setErrorPanelMessage({
            title: `Unknown Error`,
            body: 'An unknown error occurred and our system could not retrieve your messages.'
        })

        return

        setErrorPanelMessage({
            title: `${messages.error.response.status} ${messages.error.response.statusText}`,
            body: messages.error.response.data.errors[0].message
        })

    }, [messages.error])

    const actions = [
        {
            name: 'Filters',
            icon: Tune,
            variant: 'outlined',
            onClick: () => setShowPanelFilters(oldShowFilter => !oldShowFilter),
        }
    ]

    const onPageChange = (e, page) => {
        console.log(page)
        messages.pagination.getPage(page)

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    const panelFilters = {
        'platform': {
            label: 'Platform',
            options: ['Twitter', 'Personal Text', 'RS Text'],
        },
        'sender': {
        },
        'recipient_status': {
        },
        'tags': {
        },
        'send_at_dates': {
        },
        'sent_at_dates': {
        },
    }


    return (
        <BaseMessagePage
            title={getTitle(filter)}
            redirect={redirect}
            actions={actions}
            showPanelFilters={showPanelFilters}
        >
            <Stack direction="row" alignItems="center" mb={2}>
                <Stack flex={1} direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                    <span style={{ fontWeight: 'bold' }}>
                        You have{' '}
                        <span style={{ color: '#3871DA' }}>
                            {messages.pagination.totalItems || 0}
                        </span>
                        {' '}messages
                    </span>
                </Stack>
            </Stack>
            {/* <Stack justifyContent="center" alignItems="center">
                <Pagination
                    count={messages.pagination.totalPages}
                    page={messages.pagination.currentPage}
                    onChange={onPageChange}
                    disabled={messages.loading} />
            </Stack> */}
            {messages.items && messages.items.map((message, index) => {
                // console.log('rendering message ' + index)
                return (
                    <MessagePreview message={message} mini style={styles.divider} link />
                )
            })}
            {!messages.loading && messages.items && messages.items.length > 0 && (
                <Stack justifyContent="center" alignItems="center">
                    <Pagination
                        count={messages.pagination.totalPages}
                        page={messages.pagination.currentPage}
                        onChange={onPageChange}
                        disabled={messages.loading} />
                </Stack>
            )}
            {messages.loading && (
                <LoadingOverlay />
            )}

            {messages.error && (
                <ErrorPanel
                    title={errorPanelMessage.title}
                    body={errorPanelMessage.body}
                />
            )}
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
