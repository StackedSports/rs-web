import { useEffect, useState } from "react"
import { usePagination } from "Api/Pagination"
import { useQuery } from "react-query"
import { getStats } from "Api/Endpoints"

export const useStats = (startDate, endDate) => {
    const reactQuery = useQuery([startDate, endDate], () => getStats(startDate, endDate), {
        select: (data) => {
            const [stats] = data;
            return stats?.table
        }
    })

    return {
        ...reactQuery,
        items: reactQuery.data || [],
        loading: reactQuery.isLoading,
    }
}