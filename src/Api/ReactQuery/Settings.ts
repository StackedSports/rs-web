import { useQuery } from "react-query"
import { getAllStatus2, getGradYears, getPeopleTypes, getPlatform, getPositions, getRanks, getSnippets, getStatuses, getTextPlaceholders } from "Api/Endpoints"
import { IPositions, IPositionsApi } from "Interfaces/ISettings"
import { IPaginationApi } from "Interfaces"

export const usePositions = () => {
    const reactQuery = useQuery("positions", getPositions, {
        select: (data: [IPositionsApi[], IPaginationApi]): IPositions[] => data[0].map(position => ({ ...position, itemLabel: position.name, value: position.id })),
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

export const useGradYears = () => {
    const reactQuery = useQuery("gradYears", getGradYears, {
        select: (data) => data[0],
    })

    return {
        ...reactQuery,
        items: reactQuery.data || [],
        loading: reactQuery.isLoading,
    }
}

export const useStatus2 = () => {
    const reactQuery = useQuery("status2", getAllStatus2, {
        select: (data) => data[0],
    })

    return {
        ...reactQuery,
        items: reactQuery.data || [],
        loading: reactQuery.isLoading,
    }
}

export const usePlatform = () => {
    const reactQuery = useQuery("platform", getPlatform, {
        select: (data) => data[0],
    })

    return {
        ...reactQuery,
        items: reactQuery.data || [],
        loading: reactQuery.isLoading,
    }
}

export const useTextPlaceholders = () => {
    const reactQuery = useQuery("textPlaceholders", getTextPlaceholders, {
        select: (data) => data[0],
    })

    return {
        ...reactQuery,
        items: reactQuery.data || {},
        loading: reactQuery.isLoading,
    }
}

export const usePeopleTypes = () => {
    const reactQuery = useQuery("peopleTypes", getPeopleTypes, {
        select: (data) => data[0],
    })

    return {
        ...reactQuery,
        items: reactQuery.data || [],
        loading: reactQuery.isLoading,
    }
}