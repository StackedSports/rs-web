import { useEffect } from 'react'

import SettingsPage from './SettingsPage'

import CoachTypesTable from 'UI/Tables/CoachTypes/CoachTypesTable'

import { useCoachesTypes } from 'Api/Hooks'

const SendCoachTypesSettingsPage = () => {
    const coachesTypes = useCoachesTypes().items?.map((item) => ({ id: item, type: item })) || []
    const loading = useCoachesTypes()?.loading

    useEffect(() => {
        if (!coachesTypes)
            return

        console.log(coachesTypes)
    }, [coachesTypes])

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
                items={coachesTypes}
                loading={loading}
            />
        </SettingsPage>
    )
}

export default SendCoachTypesSettingsPage