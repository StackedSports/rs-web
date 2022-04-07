import { useEffect } from 'react'

import SettingsPage from './SettingsPage'

import SnippetsTable from 'UI/Tables/Snippets/SnippetsTable'

import { useSnippets } from 'Api/Hooks'

const SnippetsSettingsPage = () => {
    const snippets = useSnippets()

    useEffect(() => {
        if (!snippets.items)
            return

        console.log(snippets.items)
    }, [snippets.items])

    const onTopActionClick = (e) => {
        console.log('top action click')
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
        </SettingsPage>
    )
}

export default SnippetsSettingsPage