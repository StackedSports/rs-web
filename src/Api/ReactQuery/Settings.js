import { useEffect, useState } from "react"
import { usePagination } from "Api/Pagination"
import { useQuery } from "react-query"
import { getPositions, getRanks, getSnippets, getStatuses } from "Api/Endpoints"

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

export const useSnippets = () => {
    const reactQuery = useQuery("snippets", getSnippets, {
        select: (data) => data[0],
    })

    return {
        ...reactQuery,
        items: reactQuery.data || [],
        loading: reactQuery.isLoading,
    }
}

export const useStatuses = () => {
    const reactQuery = useQuery("statuses", getStatuses, {
        select: (data) => data[0],
    })

    return {
        ...reactQuery,
        items: reactQuery.data || [],
        loading: reactQuery.isLoading,
    }
}