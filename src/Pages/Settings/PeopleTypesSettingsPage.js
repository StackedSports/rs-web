import { useEffect } from 'react'

import SettingsPage from './SettingsPage'

import PeopleTypesTable from 'UI/Tables/PeopleTypes/PeopleTypesTable'

import { usePeopleTypes } from 'Api/ReactQuery'

const PeopleTypesSettingsPage = () => {
    const peopleTypes = usePeopleTypes()

    useEffect(() => {
        if (!peopleTypes.items)
            return

        console.log(peopleTypes.items)
    }, [peopleTypes.items])

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    return (
        <SettingsPage
            title='People Types'
            topActionName='+ New Person Type'
            onTopActionClick={onTopActionClick}
        >
            <PeopleTypesTable
                items={peopleTypes.items}
                loading={peopleTypes.loading}
            />
        </SettingsPage>
    )
}

export default PeopleTypesSettingsPage