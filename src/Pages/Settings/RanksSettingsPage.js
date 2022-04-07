import { useEffect } from 'react'

import SettingsPage from './SettingsPage'

import RanksTable from 'UI/Tables/Ranks/RanksTable'

import { useRanks } from 'Api/Hooks'

const RanksSettingsPage = () => {
    const ranks = useRanks()

    useEffect(() => {
        if (!ranks.items)
            return

        console.log(ranks.items)
    }, [ranks.items])

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    return (
        <SettingsPage
            title='Ranks'
            topActionName='+ New Rank'
            onTopActionClick={onTopActionClick}
        >
            <RanksTable
                items={ranks.items}
                loading={ranks.loading}
            />
        </SettingsPage>
    )
}

export default RanksSettingsPage