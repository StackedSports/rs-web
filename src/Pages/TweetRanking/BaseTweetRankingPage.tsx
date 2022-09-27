import React, { useContext } from 'react'

import MainLayout, { IMainLayoutProps } from 'UI/Layouts/MainLayout'

import { tweetRankingRoutes } from 'Routes/Routes'

import { AppContext } from 'Context/AppProvider'
import { IPanelFilters, ISelectedFilters } from 'UI/Widgets/PanelFilters/PanelFilters'


interface BaseTweetRankingPageProps extends Pick<IMainLayoutProps, 'title' | 'topActionName' | 'actions'> {
    showPanelFilters?: boolean;
    panelFilters?: IPanelFilters;
    onPanelFilterChange?: (selectedFilters: ISelectedFilters) => void;
    selectedFilters?: ISelectedFilters;
    children?: React.ReactNode;
}

const filters = [
    { // Category
        id: '0',
        name: 'Tweet Reports',
        items: [
            // Filters
            { id: '0', name: 'All', path: tweetRankingRoutes.tweets },
            { id: 'archived', name: 'Archived', path: tweetRankingRoutes.archived },
        ]
    },
]

export const BaseTweetRankingPage: React.FC<BaseTweetRankingPageProps> = (props) => {
    const { redirect } = useContext(AppContext)

    const onTopActionClick = () => {
        redirect(tweetRankingRoutes.search)
    }

    return (
        <MainLayout
            title={props.title || 'Tweets'}
            topActionName={props.topActionName || '+ New Search'}
            onTopActionClick={onTopActionClick}
            filters={filters}
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