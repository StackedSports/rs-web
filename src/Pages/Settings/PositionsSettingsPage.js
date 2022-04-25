import { useEffect, useState } from 'react'

import SettingsPage from './SettingsPage'

import PositionsTable from 'UI/Tables/Positions/PositionsTable'
import PositionDialog from 'UI/Widgets/Settings/PositionDialog'

import { usePositions } from 'Api/Hooks'

const PositionsSettingsPage = () => {

    const [openPositionDialog, setOpenPositionDialog] = useState(false)

    const positions = usePositions()
    // const loading = useGradeYears().loading

    useEffect(() => {
        if (!positions.items)
            return

        console.log(positions.items)
    }, [positions.items])

    const onTopActionClick = (e) => {
        setOpenPositionDialog(true)
    }

    const handleSusccess = () => {
        console.log('handle susccess')
    }

    return (
        <SettingsPage
            title='Positions'
            topActionName='+ New Position'
            onTopActionClick={onTopActionClick}
        >
            <PositionsTable
                items={positions.items}
                loading={positions.loading}
            />
            <PositionDialog
                open={openPositionDialog}
                onClose={() => setOpenPositionDialog(false)}
                onSusccess={handleSusccess}
            />
        </SettingsPage>
    )
}

export default PositionsSettingsPage