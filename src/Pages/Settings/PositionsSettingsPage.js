import { useEffect } from 'react'

import SettingsPage from './SettingsPage'

import PositionsTable from 'UI/Tables/Positions/PositionsTable'

import { usePositions } from 'Api/Hooks'

const PositionsSettingsPage = () => {
    const positions = usePositions()
    // const loading = useGradeYears().loading

    useEffect(() => {
        if(!positions.items)
            return
        
        console.log(positions.items)
    }, [positions.items])

    const onTopActionClick = (e) => {
        console.log('top action click')
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
        </SettingsPage>
    )
}

export default PositionsSettingsPage