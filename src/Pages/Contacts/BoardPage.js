import { useState, useMemo, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import BaseContactsPage from './BaseContactsPage'

import { AppContext } from 'Context/AppProvider'

import {
    useBoard,
    useBoardContacts
} from 'Api/Hooks'

export default function BoardPage(props) {
    const app = useContext(AppContext)

    const { id, boardId } = useParams();
    // console.log(id)
    // console.log(boardId)

    const board = useBoard(boardId)
    const boardContacts = useBoardContacts(boardId)

    useEffect(() => {
        if(board)
            console.log(board)
    }, [board])

    const title= useMemo(() => {
        if(board)
            return `Board: ${board.name}`
        else
            return 'Board'
    }, [board])

    const onSendMessage = (selectedData) => {
        console.log(selectedData)

        if(selectedData && selectedData.length > 0) {
            app.sendMessageToContacts(selectedData)
        } else {
            app.sendMessageToBoard(board)
        }
    }
    
    return (
        <BaseContactsPage
          title={title}
          contacts={boardContacts}
          enableSendMessageWithoutSelection
          onSendMessage={onSendMessage}
        />
    )
}