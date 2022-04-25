import { useEffect, useState } from 'react'

import SettingsPage from './SettingsPage'

import RanksTable from 'UI/Tables/Ranks/RanksTable'
import RankDialog from 'UI/Widgets/Settings/RankDialog'

import { useRanks } from 'Api/Hooks'

const RanksSettingsPage = () => {

    const [openRankDialog, setOpenRankDialog] = useState(false)
    const ranks = useRanks()

    useEffect(() => {
        if (!ranks.items)
            return

        console.log(ranks.items)
    }, [ranks.items])

    const onTopActionClick = (e) => {
        setOpenRankDialog(true)
    }

    const handleSusccess = () => {
        console.log('handle susccess')
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
            <RankDialog
                open={openRankDialog}
                onClose={() => setOpenRankDialog(false)}
                onSusccess={ handleSusccess }
            />
        </SettingsPage>
    )
}

export default RanksSettingsPage