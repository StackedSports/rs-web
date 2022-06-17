import { useState, useEffect, useRef, useMemo, useContext } from 'react'

import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import { Tune } from '@mui/icons-material'

import BaseMessagePage from './BaseMessagePage'
import MessagePreview from 'UI/Widgets/Messages/MessagePreview'
import LoadingOverlay from 'UI/Widgets/LoadingOverlay'
import ErrorPanel from 'UI/Layouts/ErrorPanel'
import RenderIf from 'UI/Widgets/RenderIf'

import { AuthContext } from 'Context/Auth/AuthProvider'
import { useParams } from "react-router-dom"
import useSearchParams, { filterObjectToQueryParams } from 'Hooks/SearchParamsHook';
import { useMessages } from 'Api/ReactQuery'
import { useTags, useTeamMembers } from 'Api/ReactQuery';
import { getFullName } from 'utils/Parser'
import { getMessagesQueryCriteriaObjFromFilters } from 'Api/Parser'

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
    const searchParams = useSearchParams()
    const { user } = useContext(AuthContext)
    const senders = useTeamMembers()
    const tags = useTags()

    const page = searchParams.page
    const DEFAULT_MESSAGE_FILTER = { status: 'all', includeTeam: user?.role?.includes('Admin') }
    const messages = useMessages(page, 10, DEFAULT_MESSAGE_FILTER)

    const { filterType, filterValue } = useParams()
    const [showPanelFilters, setShowPanelFilters] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState()
    const [errorPanelMessage, setErrorPanelMessage] = useState({ title: 'Something Went Wrong', body: '' })

/*     useEffect(() => {
        searchParams.appenSearchParams('page', messages.pagination.currentPage)
    }, [messages.pagination.currentPage])

    console.log("messages",messages.items) */

/*     useEffect(() => {
        const criteria = getMediaQueryCriteriaObjFromFilters(selectedFilters)
        searchParams.setFilters(criteria, props.onFilterRedirect)
    }, [selectedFilters])

    useEffect(() => {
        const parsedSelectedFilters = getMediaQueryCriteriaObjFromFilters(selectedFilters)
        if (!lodash.isEqual(parsedSelectedFilters, searchParams.filters)) {
            setSelectedFilters(searchParams.filters)
        }
    }, [searchParams.filters]) */

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

    const panelFilters = useMemo(() => ({
        'platform': {
            label: 'Platform',
            options: [{ id: 1, name: 'Twitter' }, { id: 2, name: 'Personal Text' }, { id: 3, name: 'RS Text' }],
        },
        'sender': {
            label: 'Sender',
            options: senders.items || [],
            optionsLabel: (sender) => getFullName(sender),
            onSearch: (search) => senders.search(search),
        },
        'recipient_status': {
            label: 'Recipient Status',
            options: [{ id: 1, name: 'Cancelled' }, { id: 2, name: 'Error' }, { id: 3, name: 'Ignored' }, { id: 4, name: 'Skipped' }, { id: 5, name: 'Sent' }, { id: 6, name: 'Pending' }],
        },
        'tags': {
            label: 'Tags',
            options: tags.items || [],
            onSearch: (search) => tags.search(search),

        },
        'send_at_dates': {
            label: 'Send At Dates',
            type: 'date',
            isUnique: true,
            optionsLabel: (dates) => dates.value.join(' - '),
        },
        'sent_at_dates': {
            label: 'Sent At Dates',
            type: 'date',
            isUnique: true,
            optionsLabel: (dates) => dates.value.join(' - '),
        },
        'status': {
            label: 'Status',
            type: 'hidden',
            isUnique: true,
            options: [{ id: 'all', name: 'All' }, { id: 'drafts', name: 'Drafts' }, { id: 'scheduled', name: 'Scheduled' }, { id: 'in_progress', name: 'In Progress' }, { id: 'finished', name: 'Finished' }, { id: 'archived', name: 'Archived' }],
        }
    }), [senders.items, tags.items])


    //Controls the filters through the props
    useEffect(() => {
        if (filterType === 'status') {
            const statusValue = panelFilters.status.options.find(status => status.id === filterValue)
            console.log(statusValue)
            statusValue && setSelectedFilters({
                status: [statusValue]
            })
        }
        if (filterType === 'team_members' && !senders.loading && senders.items) {
            const senderValue = panelFilters.sender.options.find(sender => sender.id === filterValue)
            senderValue && setSelectedFilters({
                sender: [senderValue]
            })
        }

    }, [filterType, filterValue, senders.loading, senders.items])

    const onFilterChange = (filters) => {
         //console.log(filters)
        // const criteria = getMessagesQueryCriteriaObjFromFilters(filters)
         //console.log("criteria",criteria)
         //searchParams.setFilters(criteria)

        if (Object.keys(filters).length === 0)
            messages.filter(DEFAULT_MESSAGE_FILTER)
        else {
            filters.includeTeam = user.role.includes('Admin')
            if (filters.platform)
                filters.platform = filters.platform.map(platform => platform.name)
            if (filters.sender)
                filters.sender = filters.sender.map(sender => sender.id)
            if (filters.recipient_status)
                filters.recipient_status = filters.recipient_status.map(status => status.name)
            if (filters.tags)
                filters.tags = filters.tags.map(tag => tag.name)
            if (filters.status)
                filters.status = filters.status[0].id
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
            <RenderIf condition={!messages.loading}>
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
            </RenderIf>

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
                    <MessagePreview key={index} message={message} mini style={styles.divider} link />
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
