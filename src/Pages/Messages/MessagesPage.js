import { useState, useEffect, useMemo, useContext } from 'react'

import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import { Tune } from '@mui/icons-material'

import BaseMessagePage from './BaseMessagePage'
import MessagePreview from 'UI/Widgets/Messages/MessagePreview'
import LoadingOverlay from 'UI/Widgets/LoadingOverlay'
import ErrorPanel from 'UI/Layouts/ErrorPanel'
import RenderIf from 'UI/Widgets/RenderIf'

import { AuthContext } from 'Context/Auth/AuthProvider'
import useSearchParams from 'Hooks/SearchParamsHook';
import { useMessages } from 'Api/ReactQuery'
import { useTags, useTeamMembers } from 'Api/ReactQuery';
import { getFullName } from 'utils/Parser'
import { getMessagesCriteriaFromQueryString, getMessagesQueryCriteriaObjFromFilters } from 'Api/Parser'
import lodash from "lodash"

const MessagesPage = (props) => {
    const searchParams = useSearchParams()
    const { user } = useContext(AuthContext)
    const senders = useTeamMembers()
    const tags = useTags()

    const page = searchParams.page
    const criteria = useMemo(() => ({ ...getMessagesCriteriaFromQueryString(searchParams.filters), includeTeam: user?.role?.includes('Admin') }), [searchParams.filters])
    const messages = useMessages(page, 10, criteria)

    const [showPanelFilters, setShowPanelFilters] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState()
    const [errorPanelMessage, setErrorPanelMessage] = useState({ title: 'Something Went Wrong', body: '' })

    useEffect(() => {
        searchParams.appenSearchParams('page', messages.pagination.currentPage)
    }, [messages.pagination.currentPage])

    useEffect(() => {
        const parsedSelectedFilters = getMessagesQueryCriteriaObjFromFilters(selectedFilters)
        if (!lodash.isEqual(parsedSelectedFilters, searchParams.filters)) {
            setSelectedFilters(searchParams.filters)
        }
    }, [searchParams.filters])

    useEffect(() => {
        if (!messages.error)
            return

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
        //console.log(page)
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
        'message_status': {
            label: 'Status',
            type: 'hidden',
            isUnique: true,
            options: [{ id: 'all', name: 'All' }, { id: 'drafts', name: 'Drafts' }, { id: 'scheduled', name: 'Scheduled' }, { id: 'in_progress', name: 'In Progress' }, { id: 'finished', name: 'Finished' }, { id: 'archived', name: 'Archived' }],
        }
    }), [senders.items, tags.items])

    const onFilterChange = (filters) => {
        setSelectedFilters(filters)
        const parsedSelectedFilters = getMessagesQueryCriteriaObjFromFilters(filters)
        searchParams.setFilters(parsedSelectedFilters)
    }

    return (
        <BaseMessagePage
            title={searchParams.filters?.message_status ? searchParams.filters.message_status[0].value : 'All Messages'}
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