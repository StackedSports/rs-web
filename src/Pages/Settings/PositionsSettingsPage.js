import { useEffect, useState, useMemo, useContext } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import SettingsPage from './SettingsPage'
import PositionsTable from 'UI/Tables/Positions/PositionsTable'
import PositionDialog from 'UI/Widgets/Settings/PositionDialog'

import { usePositions } from 'Api/ReactQuery'
import { deletePosition } from 'Api/Endpoints';
import { AuthContext } from 'Context/Auth/AuthProvider'
import ConfirmDialogContext from 'Context/ConfirmDialogProvider';

const PositionsSettingsPage = () => {
    const { isAdmin } = useContext(AuthContext)
    const confirmDialog = useContext(ConfirmDialogContext)
    const [openPositionDialog, setOpenPositionDialog] = useState(false)
    // row position selected to edit
    const [selectedRowPosition, setSelectedRowPosition] = useState(null)
    // selection from checkbox
    const [selectedPositions, setSelectedPositions] = useState([])


    const positions = usePositions()

    /*     useEffect(() => {
            if (!positions.items)
                return
    
            console.log(positions.items)
        }, [positions.items]) */

    const onTopActionClick = (e) => {
        setSelectedRowPosition(null)
        setOpenPositionDialog(true)
    }

    const handleSusccess = () => {
        setSelectedRowPosition(null)
        positions.refetch()
    }

    const onRowClick = (e) => {
        if (!isAdmin) return
        setSelectedRowPosition(e)
        setOpenPositionDialog(true)
    }

    const onSelectionChange = (e) => {
        setSelectedPositions(e)
    }

    const onDeleteAction = () => {
        const title = `Delete ${selectedPositions.length > 1 ? 'Positions' : 'Position'}?`
        confirmDialog.show(title, "This action can not be undone. Do you wish to continue? ", () => {
            Promise.all(selectedPositions.map(position => deletePosition(position)))
                .then(() => {
                    positions.refetch()
                }
                ).catch(err => {
                    console.log(err)
                })
        })
    }

    const actions = useMemo(() => {
        if (selectedPositions.length > 0)
            return [
                {
                    name: 'Delete (' + selectedPositions.length + ')',
                    icon: DeleteForeverIcon,
                    variant: 'outlined',
                    onClick: onDeleteAction,
                }
            ]
        return []
    }, [selectedPositions])

    return (
        <SettingsPage
            title='Positions'
            topActionName={isAdmin && '+ New Position'}
            onTopActionClick={onTopActionClick}
            actions={actions}
        >
            <PositionsTable
                items={positions.items}
                loading={positions.loading}
                onRowClick={onRowClick}
                onSelectionChange={onSelectionChange}
                checkboxSelection={isAdmin}
            />
            <PositionDialog
                open={openPositionDialog}
                onClose={() => setOpenPositionDialog(false)}
                onSusccess={handleSusccess}
                position={selectedRowPosition}
            />
        </SettingsPage>
    )
}

export default PositionsSettingsPage