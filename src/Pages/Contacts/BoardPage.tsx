import React, { useMemo, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import BaseContactsPage from './BaseContactsPage';

import { AppContext } from 'Context/AppProvider';
import useSearchParams from "Hooks/SearchParamsHook";
import useLocalStorage from "Hooks/useLocalStorage";
import { useBoard, useBoardContacts } from 'Api/ReactQuery'
import { parseColumnsNames } from 'UI/Tables/Contacts/ContactDataGridConfig';
import { ISelectedFilters } from 'UI/Widgets/PanelFilters/PanelFilters';
import { IContact } from 'Interfaces/IContact';

export default function BoardPage() {
    const app = useContext(AppContext);
    const { boardId } = useParams<{ boardId: string }>();
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

    /*     useEffect(() => {
            if (!board.item)
                return
    
            console.log("board.item", board.item)
        }, [board.item]) */

    const title = useMemo(() => {
        if (board.item)
            return `Board: ${board.item?.name}`
        else
            return 'Board'
    }, [board.item])

    const onSendMessage = (selectedData?: IContact[]) => {

        if (selectedData && selectedData.length > 0) {
            app.sendMessageToContacts(selectedData)
        } else {
            app.sendMessageToBoard(board.item)
        }
    }

    const selectedFilters = useMemo<ISelectedFilters>(() => {
        if (!board.item)
            return {}

        const { criteria } = board.item

        const entries = Object.entries(criteria).map(([k, v]) => {
            const value = v.map(v => ({ ...v, disabled: true }))
            return [k, value]
        })
        const filters: ISelectedFilters = Object.fromEntries(entries)
        return filters
    }, [board.item])

    const visibleTableColumns = useMemo(() => {
        let columns: Record<string, boolean> = {
            profile_image: true,
            full_name: true,
            twitter_profile: true,
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
                        columns[columnName] = true
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