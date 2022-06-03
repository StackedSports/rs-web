import { useEffect, useState } from "react"
import { usePagination } from "Api/Pagination"
import { useQuery } from "react-query"
import { getPositions, getRanks } from "Api/Endpoints"

export const usePositions = () => {
    const reactQuery = useQuery("positions", getPositions, {
        select: (data) => data[0],
    })

    return {
        ...reactQuery,
        items: reactQuery.data || [],
        loading: reactQuery.isLoading,
    }
}

export const useRanks = () => {
    const reactQuery = useQuery("ranks", getRanks, {
        select: (data) => data[0],
    })

    return {
        ...reactQuery,
        items: reactQuery.data || [],
        loading: reactQuery.isLoading,
    }
}