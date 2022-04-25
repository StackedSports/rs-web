import { useEffect, useState, useContext } from 'react'

import SettingsPage from './SettingsPage'

import SnippetsTable from 'UI/Tables/Snippets/SnippetsTable'
import SnippetsDialog from 'UI/Widgets/Settings/SnippetsDialog'

import { useSnippets } from 'Api/Hooks'

const SnippetsSettingsPage = () => {
    const snippets = useSnippets()
    const [openSnippetDialog, setOpenSnippetDialog] = useState(false)

    useEffect(() => {
        if (!snippets.items)
            return

        console.log(snippets.items)
    }, [snippets.items])

    const onTopActionClick = (e) => {
        setOpenSnippetDialog(true)
    }

    const handleSusccess = () => {
        console.log('handle susccess')
    }

    return (
        <SettingsPage
            title='Snippets'
            topActionName='+ New Snippet'
            onTopActionClick={onTopActionClick}
        >
            <SnippetsTable
                items={snippets.items}
                loading={snippets.loading}
            />
            <SnippetsDialog
                open={openSnippetDialog}
                onClose={() => setOpenSnippetDialog(false)}
                onSusccess={handleSusccess}
            />
        </SettingsPage>
    )
}

export default SnippetsSettingsPage