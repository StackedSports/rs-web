import { useEffect, useState, useMemo, useContext } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import SettingsPage from './SettingsPage'
import StatusesTable from 'UI/Tables/Statuses/StatusesTable'
import { StatusesDialog } from 'UI/Widgets/Settings/StatusesDialog'

import { useStatuses } from 'Api/ReactQuery'
import { deleteStatus } from 'Api/Endpoints'
import ConfirmDialogContext from 'Context/ConfirmDialogProvider';

const StatusesSettingsPage = () => {
    const statuses = useStatuses()
    const confirmDialog = useContext(ConfirmDialogContext)
    const [openStatusesDialog, setOpenStatusesDialog] = useState(false)
    // row status selected to edit
    const [selectedRowStatus, setSelectedRowStatus] = useState(null)
    // selection from checkbox
    const [selectedStatuses, setSelectedStatuses] = useState([])

    useEffect(() => {
        if (!statuses.items)
            return

        console.log(statuses.items)
    }, [statuses.items])

    const onTopActionClick = (e) => {
        setSelectedRowStatus(null)
        setOpenStatusesDialog(true)
    }

    const handleSusccess = () => {
        setSelectedRowStatus(null)
        statuses.refetch()
    }

    const onRowClick = (e) => {
        setSelectedRowStatus(e)
        setOpenStatusesDialog(true)
    }

    const onSelectionChange = (e) => {
        setSelectedStatuses(e)
    }

    const onDeleteAction = () => {
        const title = `Delete ${selectedStatuses.length > 1 ? 'Statuses' : 'Status'}`
        confirmDialog.show(title,"This action can not be undone. Do you wish to continue? ", () => {
        Promise.all(selectedStatuses.map(snippet => deleteStatus(snippet)))
            .then(() => {
                statuses.refetch()
            }
            ).catch(err => {
                console.log(err)
            })
        })
    }

    const actions = useMemo(() => {
        if (selectedStatuses.length > 0)
            return [
                {
                    name: 'Delete (' + selectedStatuses.length + ')',
                    icon: DeleteForeverIcon,
                    variant: 'outlined',
                    onClick: onDeleteAction,
                }
            ]
        return []
    }, [selectedStatuses])

    return (
        <SettingsPage
            title='Status'
            topActionName='+ New Statuses'
            onTopActionClick={onTopActionClick}
            actions={actions}
        >
            <StatusesTable
                items={statuses.items}
                loading={statuses.loading}
                onRowClick={onRowClick}
                onSelectionChange={onSelectionChange}
            />
            <StatusesDialog
                open={openStatusesDialog}
                onClose={() => setOpenStatusesDialog(false)}
                onSusccess={handleSusccess}
                status={selectedRowStatus}
            />
        </SettingsPage>
    )
}

export default StatusesSettingsPage