import { useEffect } from 'react'

import SettingsPage from './SettingsPage'

import StatusesTable from 'UI/Tables/Statuses/StatusesTable'

import { useStatuses } from 'Api/Hooks'

const StatusesSettingsPage = () => {
    const statuses = useStatuses()

    useEffect(() => {
        if (!statuses.items)
            return

        console.log(statuses.items)
    }, [statuses.items])

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    return (
        <SettingsPage
            title='Statuses'
            topActionName='+ New Statuses'
            onTopActionClick={onTopActionClick}
        >
            <StatusesTable
                items={statuses.items}
                loading={statuses.loading}
            />
        </SettingsPage>
    )
}

export default StatusesSettingsPage