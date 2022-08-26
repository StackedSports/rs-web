import { useState, useEffect, useContext, useMemo } from 'react'

import SettingsPage from './SettingsPage'
import TagsTable from 'UI/Tables/Tags/TagsTable'

import { useTags } from 'Api/ReactQuery';
import { AuthContext } from 'Context/Auth/AuthProvider'
import ConfirmDialogContext from 'Context/ConfirmDialogProvider';

const TagSettingsPage = () => {
    const { isAdmin } = useContext(AuthContext)
    const confirmDialog = useContext(ConfirmDialogContext)
    const tags = useTags()

    const [openPositionDialog, setOpenPositionDialog] = useState(false)
    // row position selected to edit
    const [selectedRowPosition, setSelectedRowPosition] = useState(null)
    // selection from checkbox
    const [selectedPositions, setSelectedPositions] = useState([])

    /*     useEffect(() => {
            if (!tags.items)
                return
    
            console.log(tags.items)
        }, [tags.items]) */

    const onTopActionClick = (e) => {
        setSelectedRowPosition(null)
        setOpenPositionDialog(true)
    }

    const handleSusccess = () => {
        setSelectedRowPosition(null)
        positions.refetch()
    }

    const onRowClick = (e) => {
        if (!isAdmin) return
        setSelectedRowPosition(e)
        setOpenPositionDialog(true)
    }

    const onSelectionChange = (e) => {
        setSelectedPositions(e)
    }

    const onDeleteAction = () => {
        const title = `Delete ${selectedPositions.length > 1 ? 'Positions' : 'Position'}?`
        confirmDialog.show(title, "This action can not be undone. Do you wish to continue? ", () => {
            Promise.all(selectedPositions.map(position => deletePosition(position)))
                .then(() => {
                    positions.refetch()
                }
                ).catch(err => {
                    console.log(err)
                })
        })
    }

    const actions = useMemo(() => {
        if (selectedPositions.length > 0)
            return [
                {
                    name: 'Delete (' + selectedPositions.length + ')',
                    icon: DeleteForeverIcon,
                    variant: 'outlined',
                    onClick: onDeleteAction,
                }
            ]
        return []
    }, [selectedPositions])

    return (
        <SettingsPage
            title='All Tags'
            topActionName={false && '+ New Tag'}
            onTopActionClick={onTopActionClick}
            actions={actions}
        >
            <TagsTable
                tags={tags.items}
                loading={tags.loading}
                //onRowClick={onRowClick}
                onSelectionChange={onSelectionChange}
                checkboxSelection={isAdmin}
            />
        </SettingsPage>
    )
}

export default TagSettingsPage