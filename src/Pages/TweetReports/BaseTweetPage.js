import { useState, useMemo, useEffect, useContext } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'

import { tweetRoutes } from 'Routes/Routes'

import { AppContext } from 'Context/AppProvider'

const filters = [
    { // Category
        id: '0',
        name: 'Tweet Reports',
        items: [
            // Filters
            { id: '0', name: 'History', path: tweetRoutes.reports },
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

export default function BaseTweetPage(props) {
    const { redirect } = useContext(AppContext)

    const onTopActionClick = (e) => {
        redirect(tweetRoutes.search)
    }

    return (
        <MainLayout
            title={props.title || 'Tweet'}
            topActionName={props.topActionName || '+ New Search'}
            onTopActionClick={props.onTopActionClick || onTopActionClick}
            filters={props.filters || filters}
            alert={props.alert}
            actions={props.actions}
            onFilterSelected={() => console.log('onFilterSelected')}
        >
            {props.children}
        </MainLayout>
    )
}