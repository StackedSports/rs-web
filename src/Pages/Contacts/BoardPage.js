import { useState, useMemo, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import BaseContactsPage from './BaseContactsPage';

import { AppContext } from 'Context/AppProvider';
import useSearchParams from "Hooks/SearchParamsHook";
import useLocalStorage from "Hooks/useLocalStorage";

import { useBoard, useBoardContacts } from 'Api/ReactQuery'
import { parseColumnsNames } from 'UI/Tables/Contacts/DataGridConfig';

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
    const { boardId } = useParams();
    const TABLE_ID = `board-perPage`

    const searchParams = useSearchParams();
    const [perPageLocalStorage, setperPageLocalStorage] = useLocalStorage(TABLE_ID, 50)
    const page = searchParams.page
    const perPage = searchParams.perPage || perPageLocalStorage
    const board = useBoard(boardId)
    const boardContacts = useBoardContacts(boardId, page, perPage)

    useEffect(() => {
        const { pagination } = boardContacts
        const params = { page: pagination.currentPage, perPage: pagination.itemsPerPage }
        searchParams.setSearchParams(params)
        setperPageLocalStorage(pagination.itemsPerPage)
    }, [boardContacts.pagination.itemsPerPage, boardContacts.pagination.currentPage, boardId])

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
        //console.log(criteria)
        let filters = {}
        if (criteria)
            Object.keys(criteria).forEach(key => {
                // console.log(key)
                // console.log(criteria[key])

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

        console.log("filters", filters)

        return filters
    }, [board.item])

    const visibleTableColumns = useMemo(() => {
        let columns = {
            profileImg: true,
            fullName: true,
            twitterName: true,
            phone: true,
        }

        if (!board.item) {
            return columns
        } else {
            // get columns from board
            if (board.item.settings)
                Object.values(board.item.settings.selected_columns).forEach(value => {
                    const columnName = parseColumnsNames(value);
                    if (columnName)
                        columns[parseColumnsNames(value)] = true
                })
            return columns
        }
    }, [board.item])

    const boardInfo = {
        id: board.item?.id,
        name: board.item?.name,
        is_shared: board.item?.is_shared,
    }

    return (
        <BaseContactsPage
            title={title}
            boardInfo={boardInfo}
            tableId={TABLE_ID}
            contacts={boardContacts}
            enableSendMessageWithoutSelection
            onSendMessage={onSendMessage}
            selectedFilters={selectedFilters}
            disabledMainActions
            columnsControl={visibleTableColumns}
            sortingMode='client'
            showBackBoardToContacts
        />
    )
}