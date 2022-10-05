import React from 'react'

import MainLayout, { IMainLayoutProps } from 'UI/Layouts/MainLayout'

import { tweetRoutes } from 'Routes/Routes'

import { IPanelFilters, ISelectedFilters } from 'UI/Widgets/PanelFilters/PanelFilters'
import { ISideFilter } from 'Interfaces'

const filters: ISideFilter[] = [
    /* { // Category
        id: '0',
        name: 'Drafts',
        items: [
            // Filters
            { id: '0', name: 'Ben Graves', path: '' },
        ]
    }, */
    { // Category
        id: '1',
        name: 'Tweet Posts',
        items: [
            // Filters
            { id: 'post', name: 'All Posts', path: { pathname: tweetRoutes.all, search: 'status=posts' } },
            /*  { id: 'draft', name: 'Draft', path: { pathname: tweetRoutes.all, search: 'status=scheduled' } },
             { id: 'scheduled', name: 'Scheduled', path: { pathname: tweetRoutes.all, search: 'status=scheduled' } },
             { id: 'published', name: 'Published', path: { pathname: tweetRoutes.all, search: 'status=published' } },
             { id: 'expired', name: 'Expired', path: { pathname: tweetRoutes.all, search: 'status=expired' } },
             { id: 'archived', name: 'Archived', path: { pathname: tweetRoutes.all, search: 'status=archived' } }, */
        ]
    },
]

interface BaseTweetPageProps extends Pick<IMainLayoutProps, 'title' | 'topActionName' | 'filters' | 'actions' | 'panelRef' | 'onTopActionTo'> {
    showPanelFilters?: boolean;
    panelFilters?: IPanelFilters;
    onPanelFilterChange?: (selectedFilters: ISelectedFilters) => void;
    selectedFilters?: ISelectedFilters;
    children?: React.ReactNode;
}

export const BaseTweetPage: React.FC<BaseTweetPageProps> = (props) => {

    return (
        <MainLayout
            title={props.title || 'Tweet'}
            topActionName={props.topActionName || '+ New Post'}
            onTopActionTo={tweetRoutes.create}
            filters={props.filters || filters}
            actions={props.actions}
            panelRef={props.panelRef}
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