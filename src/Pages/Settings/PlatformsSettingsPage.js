import { useEffect } from 'react'

import SettingsPage from './SettingsPage'

import PlatformTable from 'UI/Tables/Platform/PlatformTable'

import { usePlatform } from 'Api/Hooks'

const PlatformsSettingsPage = () => {
    const platform = usePlatform()

    useEffect(() => {
        if (!platform.items)
            return

        console.log(platform.items)
    }, [platform.items])

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    return (
        <SettingsPage
            title='Platform'
            topActionName='+ New Platform'
            onTopActionClick={onTopActionClick}
        >
            <PlatformTable
                items={platform.items}
                loading={platform.loading}
            />
        </SettingsPage>
    )
}

export default PlatformsSettingsPage