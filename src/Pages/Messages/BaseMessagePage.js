import { useState, useContext, useMemo } from 'react'

import MainLayout from 'UI/Layouts/MainLayout'

import { getFullName } from 'utils/Parser'

import { messageRoutes } from 'Routes/Routes'
import { useTeamMembers } from 'Api/ReactQuery'
import { AuthContext } from 'Context/Auth/AuthProvider'
import { filterObjectToQueryParams } from 'Hooks/SearchParamsHook'

const BaseMessagePage = (props) => {
    const { isAdmin } = useContext(AuthContext)
    const [redirect, setRedirect] = useState('')
    const teamMembers = useTeamMembers()

    const getStatusQueryString = (status) => {
        return new URLSearchParams({
            page: 1,
            filters: filterObjectToQueryParams({
                message_status: { itemLabel: status, value: status }
            })
        }).toString()
    }

    const filtersWithTeamMembers = useMemo(() => {
        return [
            {
                id: 'create',
                name: 'Message Create',
                items: [
                    { id: 'draft', name: 'Drafts', path: { pathname: messageRoutes.all, search: getStatusQueryString('Drafts') } },
                ]
            },
            {
                id: 'messages',
                name: 'Messages',
                items: [
                    {
                        id: 'all',
                        name: 'All Messages',
                        path: { pathname: messageRoutes.all, search: 'page=1' }
                    },
                    {
                        id: 'scheduled',
                        name: 'Scheduled',
                        path: { pathname: messageRoutes.all, search: getStatusQueryString('Scheduled') }
                    },
                    {
                        id: 'in_progress',
                        name: 'In Progress',
                        path: { pathname: messageRoutes.all, search: getStatusQueryString('In Progress') }
                    },
                    {
                        id: 'finished',
                        name: 'Finished',
                        path: { pathname: messageRoutes.all, search: getStatusQueryString('Finished') }
                    },
                    {
                        id: 'archived',
                        name: 'Archived',
                        path: { pathname: messageRoutes.all, search: getStatusQueryString('Archived') }
                    },
                ]
            },
            {
                id: 'teamMembers',
                name: 'Team Members',
                items: teamMembers.items.map(member => ({
                    id: member.id,
                    name: getFullName(member),
                    path: {
                        pathname: messageRoutes.all,
                        search: new URLSearchParams({
                            page: 1,
                            filters: filterObjectToQueryParams({
                                sender: {
                                    itemLabel: getFullName(member), value: member.id
                                }
                            }),
                        }).toString(),
                    },
                })),
            },
        ]
    }, [teamMembers.items, isAdmin])

    const onTopActionClick = (e) => {
        console.log('top action click')
        setRedirect(messageRoutes.create)
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
            panelRef={props.panelRef}
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
