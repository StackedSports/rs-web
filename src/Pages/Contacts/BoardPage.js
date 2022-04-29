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
        if (board)
            console.log("board: ", board.item)

    }, [board.item])

    const title = useMemo(() => {
        if (board.item)
            return `Board: ${board.item?.name}`
        else
            return 'Board'
    }, [board.item])

    const onSendMessage = (selectedData) => {
        console.log(selectedData)

        if (selectedData && selectedData.length > 0) {
            app.sendMessageToContacts(selectedData)
        } else {
            app.sendMessageToBoard(board.item)
        }
    }

    let boardCriteria = []
    for (const property in board.item?.criteria) {
        const criteriaFilter = {
            filterName: `${property[0].toUpperCase() + property.substring(1)}`,
            filter: {},
            option: {
                id: `${board.item?.criteria[property]}`,
                name: `${board.item?.criteria[property].join(", ")}`
            }
        }
        boardCriteria.push(criteriaFilter)
    }
    console.log(boardCriteria)

    return (
        <BaseContactsPage
            title={title}
            contacts={boardContacts}
            enableSendMessageWithoutSelection
            onSendMessage={onSendMessage}
            setFilter={boardCriteria}
            // showPanelFilters
        />
    )
}