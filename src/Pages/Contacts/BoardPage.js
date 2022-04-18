import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import BaseContactsPage from './BaseContactsPage'

import {
    useBoard,
    useBoardContacts
} from 'Api/Hooks'

export default function BoardPage(props) {
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
    
    return (
        <BaseContactsPage
          title={title}
          contacts={boardContacts}
        />
    )
}