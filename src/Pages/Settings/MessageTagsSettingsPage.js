import { useEffect, useContext } from 'react'

import SettingsPage from './SettingsPage'

import MessageTagsTable from 'UI/Tables/MessageTags/MessageTagsTable'

import { useTagsWithMessage } from 'Api/ReactQuery'
import { AuthContext } from 'Context/Auth/AuthProvider'

const MessageTagsSettingsPage = () => {
    const { isAdmin } = useContext(AuthContext)
    const tagsWithMessage = useTagsWithMessage()

    /*     useEffect(() => {
            if (!tagsWithMessage.items)
                return
    
            console.log(tagsWithMessage.items)
        }, [tagsWithMessage.items]) */

    const onTopActionClick = (e) => {
        console.log('top action click')
    }

    return (
        <SettingsPage
            title='Message Tags'
            topActionName={false && '+ New Message Tag'}
            onTopActionClick={onTopActionClick}
        >
            <MessageTagsTable
                items={tagsWithMessage.items}
                loading={tagsWithMessage.loading}
                checkboxSelection={false} // todo Add delete
            />
        </SettingsPage>
    )
}

export default MessageTagsSettingsPage