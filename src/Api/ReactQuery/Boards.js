import { useQuery } from "react-query"
import { getBoard, getBoards } from "Api/Endpoints"

export const useBoard = (id) => {
    const reactQuery = useQuery(`board/${id}`, () => getBoard(id), {
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
