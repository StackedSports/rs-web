import { useEffect, useState, useMemo, useContext } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import SettingsPage from './SettingsPage'
import SnippetsTable from 'UI/Tables/Snippets/SnippetsTable'
import SnippetsDialog from 'UI/Widgets/Settings/SnippetsDialog'

import { useSnippets } from 'Api/ReactQuery'
import { deleteSnippets } from 'Api/Endpoints';
import ConfirmDialogContext from 'Context/ConfirmDialogProvider';
import { AuthContext } from 'Context/Auth/AuthProvider'

const SnippetsSettingsPage = () => {
    const { isAdmin } = useContext(AuthContext)
    const snippets = useSnippets()
    const confirmDialog = useContext(ConfirmDialogContext)
    const [openSnippetDialog, setOpenSnippetDialog] = useState(false)
    // row snippet selected to edit
    const [selectedRowSnippet, setSelectedRowSnippet] = useState(null)
    // selection from checkbox
    const [selectedSnippets, setSelectedSnippets] = useState([])

    useEffect(() => {
        if (!snippets.items)
            return

        console.log(snippets.items)
    }, [snippets.items])

    const onTopActionClick = (e) => {
        setSelectedRowSnippet(null)
        setOpenSnippetDialog(true)
    }

    const handleSusccess = () => {
        setSelectedRowSnippet(null)
        snippets.refetch()
    }

    const onRowClick = (e) => {
        if (!isAdmin) return
        setSelectedRowSnippet(e)
        setOpenSnippetDialog(true)
    }

    const onSelectionChange = (e) => {
        setSelectedSnippets(e)
    }

    const onDeleteAction = () => {
        const title = `Delete ${selectedSnippets.length > 1 ? 'Snippets' : 'Snippet'}`
        confirmDialog.show(title, "This action can not be undone. Do you wish to continue? ", () => {
            Promise.all(selectedSnippets.map(snippet => deleteSnippets(snippet)))
                .then(() => {
                    snippets.refetch()
                }
                ).catch(err => {
                    console.log(err)
                })
        })
    }

    const actions = useMemo(() => {
        if (selectedSnippets.length > 0)
            return [
                {
                    name: 'Delete (' + selectedSnippets.length + ')',
                    icon: DeleteForeverIcon,
                    variant: 'outlined',
                    onClick: onDeleteAction,
                }
            ]
        return []
    }, [selectedSnippets])

    return (
        <SettingsPage
            title='Snippets'
            topActionName='+ New Snippet'
            onTopActionClick={onTopActionClick}
            actions={actions}
        >
            <SnippetsTable
                items={snippets.items}
                loading={snippets.loading}
                onRowClick={onRowClick}
                onSelectionChange={onSelectionChange}
                checkboxSelection={isAdmin}
            />
            <SnippetsDialog
                open={openSnippetDialog}
                onClose={() => setOpenSnippetDialog(false)}
                onSusccess={handleSusccess}
                snippet={selectedRowSnippet}
            />
        </SettingsPage>
    )
}

export default SnippetsSettingsPage