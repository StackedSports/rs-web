import { useState, useEffect, useRef, useMemo, useContext } from 'react'

import { useParams } from "react-router-dom"
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import { Tune } from '@mui/icons-material'

import BaseMessagePage from './BaseMessagePage'
import MessagePreview from 'UI/Widgets/Messages/MessagePreview'
import LoadingOverlay from 'UI/Widgets/LoadingOverlay'
import ErrorPanel from 'UI/Layouts/ErrorPanel'

import { AuthContext } from 'Context/Auth/AuthProvider'
import { useMessages, useTeamMembers, useTags } from 'Api/Hooks'
import { getFullName } from 'utils/Parser'

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
    const { user } = useContext(AuthContext)

    const { filterType, filterValue } = useParams()
    const lastFilter = useRef()
    const [showPanelFilters, setShowPanelFilters] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState()

    const senders = useTeamMembers()
    const tags = useTags()

    const messageFilter = useMemo(() => {
        console.log(user)

        let filter = {
            status: 'all',
            includeTeam: user.role === 'Admin' ? true : false
        }

        // if (!filterType)
        //     return { status: 'all' }
        if (filterType === 'status' && filterValue === 'finished')
            // return { status: 'finished' }
            filter.status = 'finished'
        else if (filterType === 'team_members')
            // return { status: 'all', sender: [filterValue] }
            filter['sender'] = [filterValue]
        else
            // return { status: [filterValue] }
            filter.status = [filterValue]

        return filter
    }, [filterType, filterValue])

    // console.log(filter)
    const messages = useMessages(1, 10, messageFilter)

    const [errorPanelMessage, setErrorPanelMessage] = useState({ title: 'Something Went Wrong', body: '' })

    // console.log(messages.items)

    useEffect(() => {
        console.log('on filter')
        console.log(lastFilter.current)

        if (!filterType || lastFilter.current === filterValue)
            return

        console.log('filtering for ' + filterValue)
        lastFilter.current = filterValue

        if (filterType === 'status') {
            messages.filter({ status: [filterValue] })
        } else if (filterType === 'team_members') {
            if( !senders.loading)
            setSelectedFilters({
                sender: [{ ...senders.items.find(sender => sender.id == filterValue) }]
            })
        } else {
            messages.filter({ status: [filterValue] })
        }

    }, [filterType, filterValue,senders.loading])

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
            options: [{ id: 1, name: 'Twitter' }, { id: 2, name: 'Personal Text' }, { id: 3, name: 'RS Text' }],
        },
        'sender': {
            label: 'Sender',
            options: senders.items || [],
            optionsLabel: (sender) => getFullName(sender),
        },
        'recipient_status': {
            label: 'Recipient Status',
            options: [{ id: 1, name: 'Cancelled' }, { id: 2, name: 'Error' }, { id: 3, name: 'Ignored' }, { id: 4, name: 'Skipped' }, { id: 5, name: 'Sent' }, { id: 6, name: 'Pending' }],
        },
        'tags': {
            label: 'Tags',
            options: tags || [],

        },
        'send_at_dates': {
            label: 'Send At Dates',
            type: 'date',
            isUnique: true,
            optionsLabel: (dates) => {
                return dates[0] + ' - ' + dates[1]
            },
        },
        'sent_at_dates': {
            label: 'Sent At Dates',
            type: 'date',
            isUnique: true,
            optionsLabel: (dates) => {
                return dates[0] + ' - ' + dates[1]
            },
        },
    }

    const onFilterChange = (filters) => {
        console.log(filters)

        if (Object.keys(filters).length === 0)
            messages.clearFilter()
        else {
            if (filters.platform)
                filters.platform = filters.platform.map(platform => platform.name)
            if (filters.sender)
                filters.sender = filters.sender.map(sender => sender.id)
            if (filters.recipient_status)
                filters.recipient_status = filters.recipient_status.map(status => status.name)
            if (filters.tags)
                filters.tags = filters.tags.map(tag => tag.name)
            messages.filter(filters)
        }
    }

    return (
        <BaseMessagePage
            title={getTitle(filterValue)}
            actions={actions}
            showPanelFilters={showPanelFilters}
            panelFilters={panelFilters}
            onPanelFilterChange={onFilterChange}
            selectedFilters={selectedFilters}
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
