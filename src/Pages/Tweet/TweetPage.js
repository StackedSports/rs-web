import { useState, useMemo, useEffect, useContext } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'

import { tweetRoutes } from 'Routes/Routes'

import { AppContext } from 'Context/AppProvider'
import build from '@date-io/date-fns'

const filters = [
    { // Category
        id: '0',
        name: 'Tweet Reports',
        items: [
            // Filters
            { id: '0', name: 'History', path: tweetRoutes.tweets },
        ]
    },
    // { // Category
    //     id: '1',
    //     name: 'Tweets',
    //     items: [
    //         // Filters
    //         { id: 'tweets', name: 'Tweets', path: tweetRoutes.tweets },
    //     ]
    // },
]



export default function TweetPage(props) {
    const { redirect } = useContext(AppContext)

    const onTopActionClick = (e) => {
        redirect(tweetRoutes.ranking)
    }

    return (
        <MainLayout
            title={props.title || 'Tweet'}
            topActionName={props.topActionName || '+ New Search'}
            onTopActionClick={props.onTopActionClick || onTopActionClick}
            filters={props.filters || filters}
            alert={props.alert}
            actions={props.actions}
        // onFilterSelected={onFilterSelected}
        >
            {props.children}
        </MainLayout>
    )
}