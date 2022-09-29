import React, { useState, useMemo } from 'react';
import { useTags, useTeamMembers, useTweets } from 'Api/ReactQuery';

import AutoFixHigh from '@mui/icons-material/AutoFixHigh';
import Tune from '@mui/icons-material/Tune';

import { Divider, Typography } from '@mui/material';

import { BaseTweetPage } from "./BaseTweetPage";
import { getFullName } from 'utils/Parser';
import TweetDisplay from 'UI/Widgets/Tweet/TweetDisplay';

import useSearchParams from 'Hooks/SearchParamsHook';
import { IPanelFilters } from 'UI/Widgets/PanelFilters/PanelFilters';

const getTitle = (type: string | null) => {
    console.log(type)
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
            return 'All';
    }
}

export const TweetsPage = () => {
    const { searchParams } = useSearchParams();
    const tweets = useTweets()
    const tags = useTags()
    const teamMembers = useTeamMembers()
    const [showPanelFilters, setShowPanelFilters] = useState(false)

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
    console.log(tweets.items)

    return (
        <BaseTweetPage
            title={getTitle(searchParams.get('status'))}
            actions={actions}
            showPanelFilters={showPanelFilters}
            panelFilters={panelFilters}
        >
            <Divider sx={{ mb: 3 }} />

            {Array.from(tweets.items.length > 0 ? tweets.items : new Array(10)).map((item, index) => {
                return <TweetDisplay key={index} tweet={item} loading={tweets.loading} />
            })}

        </BaseTweetPage>
    )
}

export default TweetsPage;
