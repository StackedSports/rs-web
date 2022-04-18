import { useState, useEffect, useRef, useMemo } from 'react'

import { useParams } from "react-router-dom"

import MainLayout from 'UI/Layouts/MainLayout'

import { messageRoutes } from 'Routes/Routes'

const filters = [
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
            { id: 'errors', name: 'Error', path: messageRoutes.filters.error },
            { id: '3', name: 'Archived', path: messageRoutes.filters.archived },
        ]
    }
]

const BaseMessagePage = (props) => {
    const [redirect, setRedirect] = useState('')

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
          filters={filters}
          alert={props.alert}
          loading={props.loading}
          redirect={props.redirect || redirect}
          actions={props.actions}
          onFilterSelected={onFilterSelected}
        >
            {props.children}
        </MainLayout>
    )
}

export default BaseMessagePage
