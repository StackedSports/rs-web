import { useState, useMemo, useEffect } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'

import { tweetRoutes } from 'Routes/Routes'

const filters = [
    { // Category
        id: '0',
        name: 'Explore Posts',
        items: [
            // Filters
            { id: '0', name: 'Search', path: tweetRoutes.search },
        ]
    },
    { // Category
        id: '1',
        name: 'Tweets',
        items: [
            // Filters
            { id: 'tweets', name: 'Tweets', path: tweetRoutes.tweets },
        ]
    },
]

export default function TweetPage(props) {
    return (
        <MainLayout
            title={props.title || 'Tweet'}
            topActionName={props.topActionName || null}
            onTopActionClick={props.onTopActionClick}
            filters={props.filters || filters}
            alert={props.alert}
            actions={props.actions}
        // onFilterSelected={onFilterSelected}
        >
            {props.children}
        </MainLayout>
    )
}