import { useState, useMemo, useEffect, useContext } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'

import { tweetRoutes } from 'Routes/Routes'

import { AppContext } from 'Context/AppProvider'

const filters = [
    { // Category
        id: '0',
        name: 'Drafts',
        items: [
            // Filters
            { id: '0', name: 'Ben Graves', path: tweetRoutes.search },
        ]
    },
    { // Category
        id: '1',
        name: 'Posts',
        items: [
            // Filters
            { id: 'scheduled', name: 'Scheduled', path: {pathname: tweetRoutes.all, search:'status=scheduled'} },
            { id: 'published', name: 'Published', path: {pathname: tweetRoutes.all, search:'status=published'} },
            { id: 'expired', name: 'Expired', path: {pathname: tweetRoutes.all, search:'status=expired'} },
            { id: 'archived', name: 'Archived', path: {pathname: tweetRoutes.all, search:'status=archived'} },
        ]
    },
]


export default function BaseTweetPage(props) {
    const { redirect } = useContext(AppContext)

    const onTopActionClick = (e) => {
        redirect(tweetRoutes.create)
    }

    return (
        <MainLayout
            title={props.title || 'Tweet'}
            topActionName={props.topActionName || '+ New Search'}
            onTopActionClick={onTopActionClick}
            filters={props.filters || filters}
            alert={props.alert}
            actions={props.actions}
            propsPanelFilters={{
                open: props.showPanelFilters,
                filters: props.panelFilters,
                onFilterChange: props.onPanelFilterChange,
                selectedFilters: props.selectedFilters
            }}
        >
            {props.children}
        </MainLayout>
    )
}