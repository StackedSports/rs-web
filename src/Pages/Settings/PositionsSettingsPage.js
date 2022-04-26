import { useEffect, useState, useMemo, useContext } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import SettingsPage from './SettingsPage'
import PositionsTable from 'UI/Tables/Positions/PositionsTable'
import PositionDialog from 'UI/Widgets/Settings/PositionDialog'

import { usePositions } from 'Api/Hooks'
import { deletePosition } from 'Api/Endpoints';
import ConfirmDialogContext from 'Context/ConfirmDialogProvider';

const PositionsSettingsPage = () => {

    const confirmDialog = useContext(ConfirmDialogContext)
    const [openPositionDialog, setOpenPositionDialog] = useState(false)
    // row position selected to edit
    const [selectedRowPosition, setSelectedRowPosition] = useState(null)
    // selection from checkbox
    const [selectedPositions, setSelectedPositions] = useState([])


    const positions = usePositions()
    // const loading = useGradeYears().loading

    useEffect(() => {
        if (!positions.items)
            return

        console.log(positions.items)
    }, [positions.items])

    const onTopActionClick = (e) => {
        setSelectedRowPosition(null)
        setOpenPositionDialog(true)
    }

    const handleSusccess = () => {
        setSelectedRowPosition(null)
        positions.refreshData()
    }

    const onRowClick = (e) => {
        setSelectedRowPosition(e)
        setOpenPositionDialog(true)
    }

    const onSelectionChange = (e) => {
        setSelectedPositions(e)
    }

    const onDeleteAction = () => {
        const title = `Delete ${selectedPositions.length >1 ? 'Positions': 'Position'}?`
        confirmDialog.show(title,"This action can not be undone. Do you wish to continue? ", () => {
        Promise.all(selectedPositions.map(position => deletePosition(position)))
            .then(() => {
                positions.refreshData()
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
            topActionName='+ New Position'
            onTopActionClick={onTopActionClick}
            actions={actions}
        >
            <PositionsTable
                items={positions.items}
                loading={positions.loading}
                onRowClick={onRowClick}
                onSelectionChange={onSelectionChange}
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