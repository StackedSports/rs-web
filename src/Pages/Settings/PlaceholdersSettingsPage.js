import { useEffect } from 'react'

import SettingsPage from './SettingsPage'

import PlaceholdersTable from 'UI/Tables/Placeholders/PlaceholdersTable'

import { usePlaceholders } from 'Api/Hooks'

const PlaceholdersSettingsPage = () => {
    const placeholders = usePlaceholders()

    useEffect(() => {
        if (!placeholders.items)
            return

        console.log(placeholders.items)
    }, [placeholders.items])

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    return (
        <SettingsPage
            title='Placeholders'
            topActionName='+ New Placeholder'
            onTopActionClick={onTopActionClick}
        >
            <PlaceholdersTable
                items={placeholders.items}
                loading={placeholders.loading}
            />
        </SettingsPage>
    )
}

export default PlaceholdersSettingsPage