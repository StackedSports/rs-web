import { useState, useMemo, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import BaseContactsPage from './BaseContactsPage';

import { AppContext } from 'Context/AppProvider';

import {
    useBoard,
    useBoardContacts
} from 'Api/Hooks';

const parseCriteriaNames = (criteria) => {
    switch (criteria) {
        case 'ranks':
            return 'rank'
        case 'years':
            return 'gradYear'
        case 'positions':
            return 'position'
        case 'area_coaches':
            return 'areaCoach'
        case 'position_coaches':
            return 'positionCoach'
        case 'timezones':
            return 'timeZone'
        case 'states':
            return 'state'
        default:
            return criteria

    }
}

const parseSelectedColumnsNames = (column) => {
    switch (column) {
        case "first_name":
            return "firstName"
        case "last_name":
            return "lastName"
        case "twitter":
            return "twitterProfile", "profileImg"
        case "grad_year":
            return "gradYear"
        case "team_positions":
            return "position"
        case "last_messaged_at":
            return "lastMessaged"
        case "created_at":
            return "createdAt"
        default:
            return column
    }
}

export default function BoardPage(props) {
    const app = useContext(AppContext);

    const { id, boardId } = useParams();
    // console.log(id)
    // console.log(boardId)

    const board = useBoard(boardId)
    const boardContacts = useBoardContacts(boardId)

    useEffect(() => {
        if (board.item)
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

    const selectedFilters = useMemo(() => {
        if (!board.item)
            return null

        let criteria = board.item.criteria
        let filters = {}

        Object.keys(criteria).forEach(key => {
            console.log(key)
            console.log(criteria[key])

            let filterName = parseCriteriaNames(key)

            if (!filters[filterName])
                filters[filterName] = []

            criteria[key].forEach(item => {
                filters[filterName].push({
                    id: item,
                    name: item,
                    disabled: true
                })
            })
        })

        console.log(filters)

        return filters
    }, [board.item])

    let selectedColumns = {}
    board.item?.settings?.selected_columns.forEach(column => {
        const key = parseSelectedColumnsNames(column)
        selectedColumns[key] = true
    })
    console.log(boardContacts)

    return (
        <BaseContactsPage
            title={title}
            id={board.item?.id}
            contacts={boardContacts}
            enableSendMessageWithoutSelection
            onSendMessage={onSendMessage}
            selectedFilters={selectedFilters}
            disabledMainActions
            columnsControl={selectedColumns}
        />
    )
}