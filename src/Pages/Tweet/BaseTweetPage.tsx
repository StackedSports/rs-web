import React, { useContext } from 'react'

import MainLayout, { IMainLayoutProps } from 'UI/Layouts/MainLayout'

import { tweetRoutes } from 'Routes/Routes'

import { AppContext } from 'Context/AppProvider'
import { IPanelFilters, ISelectedFilters } from 'UI/Widgets/PanelFilters/PanelFilters'
import { ISideFilter } from 'Interfaces'

const filters: ISideFilter[] = [
    { // Category
        id: '0',
        name: 'Drafts',
        items: [
            // Filters
            { id: '0', name: 'Ben Graves', path: 'wew' },
        ]
    },
    { // Category
        id: '1',
        name: 'Posts',
        items: [
            // Filters
            { id: 'scheduled', name: 'Scheduled', path: { pathname: tweetRoutes.all, search: 'status=scheduled' } },
            { id: 'published', name: 'Published', path: { pathname: tweetRoutes.all, search: 'status=published' } },
            { id: 'expired', name: 'Expired', path: { pathname: tweetRoutes.all, search: 'status=expired' } },
            { id: 'archived', name: 'Archived', path: { pathname: tweetRoutes.all, search: 'status=archived' } },
        ]
    },
]

interface BaseTweetPageProps extends Pick<IMainLayoutProps, 'title' | 'topActionName' | 'filters' | 'actions'> {
    showPanelFilters?: boolean;
    panelFilters?: IPanelFilters;
    onPanelFilterChange?: (selectedFilters: ISelectedFilters) => void;
    selectedFilters?: ISelectedFilters;
    children?: React.ReactNode;
}

export const BaseTweetPage: React.FC<BaseTweetPageProps> = (props) => {
    const { redirect } = useContext(AppContext)

    const onTopActionClick = () => {
        redirect(tweetRoutes.create)
    }

    return (
        <MainLayout
            title={props.title || 'Tweet'}
            topActionName={props.topActionName || '+ New Search'}
            onTopActionClick={onTopActionClick}
            filters={props.filters || filters}
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