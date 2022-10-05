import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useTags, useTeamMembers, useTweets } from 'Api/ReactQuery';

import { Divider } from '@mui/material';
import AutoFixHigh from '@mui/icons-material/AutoFixHigh';
import Tune from '@mui/icons-material/Tune';

import { BaseTweetPage } from "./BaseTweetPage";
import { getFullName } from 'utils/Parser';
import TweetDisplay from 'UI/Widgets/Tweet/TweetDisplay';

import useLocalStorage from 'Hooks/useLocalStorage';
import useSearchParams from 'Hooks/SearchParamsHook';
import { IPanelFilters } from 'UI/Widgets/PanelFilters/PanelFilters';
import { CustomPagination } from 'UI/Widgets/Pagination/CustomPagination';
import RenderIf from 'UI/Widgets/RenderIf';
import ErrorPanel from 'UI/Layouts/ErrorPanel';

const getTitle = (type: string | null) => {
    switch (type) {
        case 'scheduled':
            return 'Scheduled';
        case 'published':
            return 'Published';
        case 'expired':
            return 'Expired';
        case 'archived':
            return 'Archived';
        default:
            return 'All Posts';
    }
}

export const TweetsPage = () => {
    const { searchParams, appendSearchParams, page } = useSearchParams();
    const [perPageLocalStorage, setperPageLocalStorage] = useLocalStorage(`tweets-table-perPage`, 10)
    const scrollToTopTableRef = useRef<null | HTMLElement>()
    const tweets = useTweets(page, perPageLocalStorage)
    const tags = useTags()
    const teamMembers = useTeamMembers()
    const [showPanelFilters, setShowPanelFilters] = useState(false)

    useEffect(() => {
        appendSearchParams('page', tweets.pagination.currentPage)
    }, [tweets.pagination.currentPage])

    const panelFilters: IPanelFilters = useMemo(() =>
    ({
        "type": {
            label: 'Type',
            options: [
                { id: 'twitter', name: 'Twitter' },
                { id: 'instagram', name: 'Instagram' },
            ]
        },
        "account": {
            label: 'Account',
            options: teamMembers.items,
            optionsLabel: (item) => getFullName(item),
            onSearch: (search) => teamMembers.search(search),
        },
        "tag_id": {
            label: 'Tags',
            options: tags.items,
            onSearch: (search) => tags.search(search),
        },
        "status": {
            label: 'Status',
            options: [
                { id: 'published', name: 'Published' },
                { id: 'scheduled', name: 'Scheduled' },
                { id: 'expired', name: 'Expired' },
                { id: 'archived', name: 'Archived' }
            ]
        },
        "created_at": {
            label: 'Date',
            type: 'date',
            optionsLabel: (dates) => dates.join(' - '),
            disableFuture: true,
            isUnique: true
        },
    }), [tags.items, teamMembers.items])


    const actions = [
        {
            name: 'Action',
            icon: AutoFixHigh,
            variant: 'outlined',
            type: 'dropdown',
            options: []
        },
        {
            name: 'Filters',
            icon: Tune,
            variant: 'outlined',
            onClick: () => setShowPanelFilters(oldShowFilter => !oldShowFilter),
        },
    ]

    const onPageChange = (_e: React.ChangeEvent<unknown>, page: number) => {
        if (scrollToTopTableRef.current)
            scrollToTopTableRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" })

        tweets.pagination.getPage(page)
    }

    const onPerPageChange = (value: number) => {
        if (scrollToTopTableRef.current) {
            scrollToTopTableRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" })
        }
        setperPageLocalStorage(value)
    }

    return (
        <BaseTweetPage
            title={getTitle(searchParams.get('status'))}
            //actions={actions}
            //showPanelFilters={showPanelFilters}
            //panelFilters={panelFilters}
            panelRef={scrollToTopTableRef}
        >
            <Divider sx={{ mb: 3 }} />

            <RenderIf condition={tweets.isError}>
                <ErrorPanel
                    title={`${tweets.error?.response?.status} ${tweets.error?.response?.statusText}`}
                    body={tweets.error?.response?.data?.errors[0]?.message}
                />
            </RenderIf>

            {!tweets.isError && Array.from(tweets.items.length > 0 ? tweets.items : new Array(10)).map((item, index) => {
                return <TweetDisplay tweet={item} loading={tweets.loading} key={index} showCheckbox />
            })}

            {!tweets.loading && tweets.items && tweets.items.length > 0 && (
                <CustomPagination
                    totalPages={tweets.pagination.totalPages}
                    currentPage={tweets.pagination.currentPage}
                    perPage={tweets.pagination.itemsPerPage}
                    totalItems={tweets.pagination.totalItems}
                    disabled={tweets.loading}
                    onPageChange={onPageChange}
                    onPerPageChange={onPerPageChange}
                    perPageOptions={[10, 20, 50, 100]}
                />
            )}
        </BaseTweetPage>
    )
}

export default TweetsPage;