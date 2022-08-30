import { useState, useEffect } from "react"
import { useQuery, useQueryClient, useMutation } from "react-query"
import { createNewBoard, updateBoard, getBoard, getBoardContacts, getBoards, deleteBoard } from "Api/Endpoints"
import { usePagination } from "Api/Pagination"
import { IBoard, IBoardApi, IBoardCriteria, IBoardCriteriaApi, IPaginationApi } from "Interfaces"
import { keys } from "@mui/system"

export const useBoard = (id: string) => {
    const reactQuery = useQuery(['board', id], () => getBoard(id), {
        select: (data: [IBoardApi, IPaginationApi]): IBoard => {
            const board = data[0]
            return { ...board, criteria: parseCriteriaBoard(board.criteria) }
        },
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
        select: (data: [IBoardApi[], IPaginationApi]) => data[0].sort((a, b) => a.name.localeCompare(b.name)),
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
        remove: remove.mutate,
        create: create.mutate,
    }
}

function parseCriteriaBoard(criteria: IBoardCriteriaApi): IBoardCriteria {
    const output: IBoardCriteria = {}
    Object.entries(criteria).forEach(([key, value], index) => {
        switch (key) {
            case 'status':
                output[key] = value.map((status: {
                    status: string; id: string
                }) => ({
                    ...status,
                    itemLabel: status.status,
                    itemValue: status.id
                }))
                break;
            case 'ranks':
                output[key] = value.map((rank: {
                    rank: string; id: string
                }) => ({
                    ...rank,
                    itemLabel: rank.rank,
                    itemValue: rank.id
                }))
                break;
            case 'years':
                output[key] = value.map((year: number) => ({
                    itemLabel: year,
                    itemValue: year
                }))
                break;
            case 'tags':
                output[key] = value.map((tag: string) => ({
                    itemLabel: tag,
                    itemValue: tag
                }))
                break;
            case 'positions':
                output[key] = value.map((position: string) => ({
                    itemLabel: position,
                    itemValue: position
                }))
                break;
            case 'area_coaches':
                output[key] = value.map((areaCoach: {
                    full_name: string; id: string
                }) => ({
                    ...areaCoach,
                    itemLabel: areaCoach.full_name,
                    itemValue: areaCoach.id
                }))
                break;
            case 'position_coaches':
                output[key] = value.map((positionCoach: {
                    full_name: string; id: string
                }) => ({
                    ...positionCoach,
                    itemLabel: positionCoach.full_name,
                    itemValue: positionCoach.id
                }))
                break;
            case 'states':
                output[key] = value.map((state: string) => ({
                    itemLabel: state,
                    itemValue: state
                }))
                break;
            case 'timezones':
                output[key] = value.map((timezone: string) => ({
                    itemLabel: timezone,
                    itemValue: timezone
                }))
                break;
            case 'status_2':
                output[key] = value.map((status2: string) => ({
                    itemLabel: status2,
                    itemValue: status2
                }))
                break;
            default:
                break;
        }
    })
    return output
}

