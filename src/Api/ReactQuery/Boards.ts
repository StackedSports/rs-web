import { useState, useEffect } from "react"
import { useQuery, useQueryClient, useMutation } from "react-query"
import { createNewBoard, updateBoard, getBoard, getBoardContacts, getBoards, deleteBoard } from "Api/Endpoints"
import { usePagination } from "Api/Pagination"
import { IBoard, IPaginationApi } from "Interfaces"

export const useBoard = (id: string) => {
    const reactQuery = useQuery(['board', id], () => getBoard(id), {
        select: (data: [IBoard, IPaginationApi]) => data[0],
        enabled: !!id,
    })

    return {
        ...reactQuery,
        item: reactQuery.data,
        loading: reactQuery.isLoading,
    }
}

export const useBoards = () => {
    const reactQuery = useQuery(`boards`, getBoards, {
        select: (data: [IBoard[], IPaginationApi]) => data[0].sort((a, b) => a.name.localeCompare(b.name)),
    })

    return {
        ...reactQuery,
        items: reactQuery.data,
        loading: reactQuery.isLoading,
    }
}

export const useBoardContacts = (boardId: string, currentPage: number, itemsPerPage: number) => {

    const [contacts, setContacts] = useState<unknown>()
    const [pagination, setPagination] = usePagination(currentPage, itemsPerPage)

    const reactQuery = useQuery(['boardContacts', boardId, pagination.currentPage, pagination.itemsPerPage], () => getBoardContacts(boardId, pagination.currentPage, pagination.itemsPerPage),
        {
            enabled: !!boardId,
        })

    useEffect(() => {
        if (reactQuery.isSuccess) {
            const [apiContacts, apiPagination]: [unknown, IPaginationApi] = reactQuery.data
            setContacts(apiContacts)
            setPagination(apiPagination)
        }
    }, [reactQuery.isSuccess, reactQuery.data])

    useEffect(() => {
        if (currentPage && currentPage != pagination.currentPage) {
            pagination.getPage(currentPage)
        }
    }, [currentPage])

    useEffect(() => {
        if (itemsPerPage && itemsPerPage != pagination.itemsPerPage) {
            pagination.getItemsPerPage(itemsPerPage)
        }
    }, [itemsPerPage])

    return {
        ...reactQuery,
        items: contacts,
        loading: reactQuery.isLoading,
        pagination,
    }
}

export const useBoardMutation = () => {
    const queryClient = useQueryClient();

    const update = useMutation(({ id, data }: { id: string, data: unknown }) => updateBoard(id, data), {
        onSuccess: () => queryClient.invalidateQueries(`boards`),
    });

    const remove = useMutation((id: string) => deleteBoard(id), {
        onSuccess: (data, variables, context) => {
            queryClient.cancelQueries(['board', variables])
            queryClient.cancelQueries('boards')
        }
    });

    const create = useMutation(({ data, filters }: { data: unknown, filters: any }) => createNewBoard(data, filters), {
        onSuccess: () => queryClient.resetQueries('boards'),
    });

    return {
        update: update.mutate,
        //remove: remove.mutate,
        create: create.mutate,
    }
}

