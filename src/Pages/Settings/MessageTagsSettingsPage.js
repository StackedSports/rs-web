import { useEffect } from 'react'

import SettingsPage from './SettingsPage'

import MessageTagsTable from 'UI/Tables/MessageTags/MessageTagsTable'

import { useTagsWithMessage } from 'Api/ReactQuery'


const MessageTagsSettingsPage = () => {
    const tagsWithMessage = useTagsWithMessage()

    useEffect(() => {
        if (!tagsWithMessage.items)
            return

        console.log(tagsWithMessage.items)
    }, [tagsWithMessage.items])

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    return (
        <SettingsPage
            title='Message Tags'
            topActionName='+ New Message Tag'
            onTopActionClick={onTopActionClick}
        >
            <MessageTagsTable
                items={tagsWithMessage.items}
                loading={tagsWithMessage.loading}
            />
        </SettingsPage>
    )
}

export default MessageTagsSettingsPage