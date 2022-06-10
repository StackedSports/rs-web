import { useState, useMemo, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import BaseContactsPage from './BaseContactsPage';

import { AppContext } from 'Context/AppProvider';

import { useBoard, useBoardContacts } from 'Api/ReactQuery'

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

export default function BoardPage(props) {
    const app = useContext(AppContext);

    const { id, boardId } = useParams();

    const board = useBoard(boardId)
    const boardContacts = useBoardContacts(boardId)

    useEffect(() => {
        if (!board.item)
            return

        console.log("board.item", board.item)
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
        console.log(criteria)
        let filters = {}
        if (criteria)
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

        //console.log("filters", filters)

        return filters
    }, [board.item])

    const visibleTableColumns = useMemo(() => {
        let columns = {
            profileImg: true,
            fullName: true,
            twitterName: true,
            phone: true
        }

        if (!board.item) {
            return columns
        } else {
            // get columsn from criteria
            if (board.item.criteria)
                Object.keys(board.item.criteria).forEach(key => {
                    columns[parseCriteriaNames(key)] = true
                })

            // console.log('board column = ', columns)

            return columns
        }
    }, [board.item])

    // console.log(boardContacts)

    const boardInfo = {
        id: board.item?.id,
        name: board.item?.name,
        is_shared: board.item?.is_shared,
    }


    return (
        <BaseContactsPage
            title={title}
            id={board.item?.id}
            boardInfo={boardInfo}
            tableId={`board-${boardId}-page`}
            contacts={boardContacts}
            enableSendMessageWithoutSelection
            onSendMessage={onSendMessage}
            selectedFilters={selectedFilters}
            disabledMainActions
            columnsControl={visibleTableColumns}
            showBackBoardToContacts
        />
    )
}