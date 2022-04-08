import { useEffect } from 'react'

import SettingsPage from './SettingsPage'

import BoardTable from 'UI/Tables/Board/BoardTable'

import { usePlatform } from 'Api/Hooks'

const BoardSettingsPage = () => {
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
            title='Board'
            topActionName='+ New Board'
            onTopActionClick={onTopActionClick}
        >
            <BoardTable
                items={platform.items}
                loading={platform.loading}
            />
        </SettingsPage>
    )
}

export default BoardSettingsPage