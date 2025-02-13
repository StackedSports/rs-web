import { useState, useEffect } from "react"
import { useQuery, useQueryClient, useMutation } from "react-query"
import { createNewBoard, updateBoard, getBoard, getBoardContacts, getBoards, deleteBoard } from "Api/Endpoints"
import { usePagination } from "Api/Pagination"
import { IBoard, IBoardApi, IBoardCriteria, IBoardCriteriaApi, IPaginationApi } from "Interfaces"

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
        select: (data: [IBoardApi[], IPaginationApi]): IBoard[] => data[0].
            sort((a, b) => a.name.localeCompare(b.name)).
            map(board => ({ ...board, criteria: parseCriteriaBoard(board.criteria) })),
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
        onSuccess: (_data, variables, _context) => {
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
    Object.entries(criteria).forEach(([key, value]) => {
        switch (key) {
            case 'status':
                output[key] = value.map((status: {
                    status: string; id: string
                }) => ({
                    ...status,
                    label: status.status,
                    value: status.id
                }))
                break;
            case 'ranks':
                output['rank'] = value.map((rank: {
                    rank: string; id: string
                }) => ({
                    ...rank,
                    label: rank.rank,
                    value: rank.id
                }))
                break;
            case 'years':
                output['grad_year'] = value.map((year: number) => ({
                    label: year,
                    value: year
                }))
                break;
            case 'tags':
                output[key] = value.map((tag: string) => ({
                    label: tag,
                    value: tag
                }))
                break;
            case 'positions':
                output[key] = value.map((position: string) => ({
                    label: position,
                    value: position
                }))
                break;
            case 'area_coaches':
                output['area_coach'] = value.map((areaCoach: {
                    full_name: string; id: string
                }) => ({
                    ...areaCoach,
                    label: areaCoach.full_name,
                    value: areaCoach.id
                }))
                break;
            case 'position_coaches':
                output['position_coach'] = value.map((positionCoach: {
                    full_name: string; id: string
                }) => ({
                    ...positionCoach,
                    label: positionCoach.full_name,
                    value: positionCoach.id
                }))
                break;
            case 'states':
                output['state'] = value.map((state: string) => ({
                    label: state,
                    value: state
                }))
                break;
            case 'timezones':
                output['time_zone'] = value.map((timezone: string) => ({
                    label: timezone,
                    value: timezone,
                }))
                break;
            case 'status_2':
                output[key] = value.map((status2: string) => ({
                    label: status2,
                    value: status2
                }))
                break;
            case 'dob':
                output[key] = [{
                    label: value.join("-"),
                    value: value
                }]
                break;
            default:
                break;
        }
    })
    return output
}

