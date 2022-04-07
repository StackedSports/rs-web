import { useState, useEffect } from 'react'

import SettingsPage from './SettingsPage'

import CoachTypesTable from 'UI/Tables/CoachTypes/CoachTypesTable'

import { useCoachesTypes } from 'Api/Hooks'

const SendCoachTypesSettingsPage = () => {
    const coachesTypes = useCoachesTypes()
    // const loading = useGradeYears().loading

    const [items, setItems] = useState([])

    useEffect(() => {
        if(!coachesTypes.items)
            return
        
        setItems(coachesTypes.items.map((item, index) => ({ id: index, type: item })))
    }, [coachesTypes.items])


    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    return (
        <SettingsPage
            title='Send As Coach Types'
            topActionName='+ New Rank'
            onTopActionClick={onTopActionClick}
        >
            <CoachTypesTable
                items={items}
                loading={coachesTypes.loading}
            />
        </SettingsPage>
    )
}

export default SendCoachTypesSettingsPage