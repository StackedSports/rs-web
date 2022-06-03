import { useEffect, useState, useMemo, useContext } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import SettingsPage from './SettingsPage'
import RanksTable from 'UI/Tables/Ranks/RanksTable'
import RankDialog from 'UI/Widgets/Settings/RankDialog'

import { useRanks } from 'Api/ReactQuery'
import { deleteRank } from 'Api/Endpoints';
import ConfirmDialogContext from 'Context/ConfirmDialogProvider';

const RanksSettingsPage = () => {

    const confirmDialog = useContext(ConfirmDialogContext)
    const ranks = useRanks()
    const [openRankDialog, setOpenRankDialog] = useState(false)
    // row rank selected to edit
    const [selectedRowRank, setSelectedRowRank] = useState(null)
    // selection from checkbox
    const [selectedRanks, setSelectedRanks] = useState([])

    useEffect(() => {
        if (!ranks.items)
            return

        console.log(ranks.items)
    }, [ranks.items])

    const onTopActionClick = (e) => {
        setSelectedRowRank(null)
        setOpenRankDialog(true)
    }

    const handleSusccess = () => {
        setSelectedRowRank(null)
        ranks.refetch()
    }

    const onRowClick = (e) => {
        setSelectedRowRank(e)
        setOpenRankDialog(true)
    }

    const onSelectionChange = (e) => {
        setSelectedRanks(e)
    }

    const onDeleteAction = () => {
        const title = `Delete ${selectedRanks.length >1 ? 'Ranks': 'Rank'}?`
        confirmDialog.show(title,"This action can not be undone. Do you wish to continue? ", () => {
            Promise.all(selectedRanks.map(rank => deleteRank(rank)))
                .then(() => {
                    ranks.refetch()
                }
                ).catch(err => {
                    console.log(err)
                })
        })
    }

    const actions = useMemo(() => {
        if (selectedRanks.length > 0)
            return [
                {
                    name: 'Delete (' + selectedRanks.length + ')',
                    icon: DeleteForeverIcon,
                    variant: 'outlined',
                    onClick: onDeleteAction,
                }
            ]
        return []
    }, [selectedRanks])

    return (
        <SettingsPage
            title='Ranks'
            topActionName='+ New Rank'
            onTopActionClick={onTopActionClick}
            actions={actions}
        >
            <RanksTable
                items={ranks.items}
                loading={ranks.loading}
                onRowClick={onRowClick}
                onSelectionChange={onSelectionChange}
            />
            <RankDialog
                open={openRankDialog}
                onClose={() => setOpenRankDialog(false)}
                onSusccess={handleSusccess}
                rank={selectedRowRank}
            />
        </SettingsPage>
    )
}

export default RanksSettingsPage