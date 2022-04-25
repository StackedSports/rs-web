import { useEffect, useState } from 'react'

import SettingsPage from './SettingsPage'

import StatusesTable from 'UI/Tables/Statuses/StatusesTable'
import { StatusesDialog } from 'UI/Widgets/Settings/StatusesDialog'

import { useStatuses } from 'Api/Hooks'

const StatusesSettingsPage = () => {
    const statuses = useStatuses()
    const [openStatusesDialog, setOpenStatusesDialog] = useState(false)

    useEffect(() => {
        if (!statuses.items)
            return

        console.log(statuses.items)
    }, [statuses.items])

    const onTopActionClick = (e) => {
        setOpenStatusesDialog(true)
    }

    const handleSusccess = () => {
        console.log('handle susccess')
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
            <StatusesDialog
                open={openStatusesDialog}
                onClose={() => setOpenStatusesDialog(false)}
                onSusccess={handleSusccess}
            />
        </SettingsPage>
    )
}

export default StatusesSettingsPage