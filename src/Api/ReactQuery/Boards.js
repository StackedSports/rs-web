import { useState, useEffect } from "react"
import { useQuery, useQueryClient, useMutation } from "react-query"
import { createNewBoard, updateBoard, getBoard, getBoardContacts, getBoards } from "Api/Endpoints"
import { usePagination } from "Api/Pagination"

export const useBoard = (id) => {
    const reactQuery = useQuery(['board', id], () => getBoard(id), {
        select: (data) => data[0],
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
        select: (data) => data[0],
    })

    return {
        ...reactQuery,
        items: reactQuery.data,
        loading: reactQuery.isLoading,
    }
}

export const useBoardContacts = (boardId, currentPage, itemsPerPage) => {

    const [contacts, setContacts] = useState(null)
    const [pagination, setPagination] = usePagination(currentPage, itemsPerPage)

    const reactQuery = useQuery(['boardContacts', boardId, pagination.currentPage, pagination.itemsPerPage], () => getBoardContacts(boardId, pagination.currentPage, pagination.itemsPerPage),
        {
            enabled: !!boardId,
        })

    useEffect(() => {
        if (reactQuery.isSuccess) {
            const [apiContacts, apiPagination] = reactQuery.data
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

    const update = useMutation(({ id, data }) => updateBoard(id, data), {
        onSuccess: () => queryClient.invalidateQueries(`boards`),
    });

    const remove = useMutation();
    const create = useMutation(({ data, filters }) => createNewBoard(data, filters), {
        onSuccess: () => queryClient.resetQueries('boards'),
    });

    return {
        update: update.mutate,
        remove: remove.mutate,
        create: create.mutate,
    }
}

