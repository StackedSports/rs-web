import { useState, useEffect, useRef, useMemo } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'

import { getFullName } from 'utils/Parser'

import { messageRoutes } from 'Routes/Routes'
import { useTeamMembers } from 'Api/Hooks'


/* const filters = [
    {
        id: 'create',
        name: 'Message Create',
        items: [
            { id: 'draft', name: 'Drafts', path: messageRoutes.filters.drafts },
        ]
    },
    { // Category
        id: '0',
        name: 'Messages',
        items: [
            { id: 'all', name: 'All Messages', path: messageRoutes.all },
            { id: '0', name: 'Scheduled', path: messageRoutes.filters.scheduled },
            { id: '1', name: 'In Progress', path: messageRoutes.filters.inProgress },
            { id: '2', name: 'Finished', path: messageRoutes.filters.finished },
            // { id: 'errors', name: 'Error', path: messageRoutes.filters.error },
            { id: '3', name: 'Archived', path: messageRoutes.filters.archived },
        ]
    },
    {
        id: '1',
        name: 'Team Members',
        items: teamMembersFilterItems
    }
] */

const BaseMessagePage = (props) => {
    const [redirect, setRedirect] = useState('')
    const teamMembers = useTeamMembers()

    const teamMembersFilterItems = useMemo(() => {
        if (!teamMembers.loading && teamMembers.items) {
            return teamMembers.items.map(member => ({
                id: member.id,
                name: getFullName(member),
                path: `${messageRoutes.filters.teamMembers}/${member.id}`
            }))
        }
        return []
    }, [teamMembers.items,teamMembers.loading])


    const filtersWithTeamMembers = useMemo(() => {
        return [
            {
                id: 'create',
                name: 'Message Create',
                items: [
                    { id: 'draft', name: 'Drafts', path: messageRoutes.filters.drafts },
                ]
            },
            { // Category
                id: '0',
                name: 'Messages',
                items: [
                    { id: 'all', name: 'All Messages', path: messageRoutes.all },
                    { id: '0', name: 'Scheduled', path: messageRoutes.filters.scheduled },
                    { id: '1', name: 'In Progress', path: messageRoutes.filters.inProgress },
                    { id: '2', name: 'Finished', path: messageRoutes.filters.finished },
                    // { id: 'errors', name: 'Error', path: messageRoutes.filters.error },
                    { id: '3', name: 'Archived', path: messageRoutes.filters.archived },
                ]
            },
            {
                id: '1',
                name: 'Team Members',
                items: teamMembersFilterItems
            }
        ]
    }, [teamMembersFilterItems])


    const onTopActionClick = (e) => {
        console.log('top action click')
        setRedirect(messageRoutes.create)
    }

    const onFilterSelected = (filter, filterIndex, categoryIndex) => {
        console.log('Filter ' + filters[categoryIndex].items[filterIndex].name + ' selected from ' + filters[categoryIndex].name)
    }

    return (
        <MainLayout
            title={props.title || 'Messages'}
            topActionName={props.topActionName || '+ New Message'}
            onTopActionClick={onTopActionClick}
            filters={filtersWithTeamMembers}
            alert={props.alert}
            loading={props.loading}
            redirect={props.redirect || redirect}
            actions={props.actions}
            onFilterSelected={onFilterSelected}
            propsPanelFilters={{
                open: props.showPanelFilters,
                filters: props.panelFilters,
                onFilterChange: props.onPanelFilterChange,
                setFilter: props.setFilter,
                selectedFilters: props.selectedFilters

            }}
        >
            {props.children}
        </MainLayout>
    )
}

export default BaseMessagePage
