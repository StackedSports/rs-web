import { useQuery } from "react-query"
import {
    getAllStatus2,
    getGradYears,
    getPeopleTypes,
    getPlatform,
    getPositions,
    getRanks,
    getSnippets,
    getStatuses,
    getTextPlaceholders
} from "Api/Endpoints"
import { IGradYears, IPeopleType, IPeopleTypeApi, IPlatform, IPlatformApi, IPositions, IPositionsApi, IRank, IRankApi, ISnippets, ISnippetsApi, IStatus, IStatusApi, IStatus_2, ITextPlaceholderApi } from "Interfaces/ISettings"
import { IPaginationApi, IApiResponse } from "Interfaces"

export const usePositions = () => {
    const reactQuery = useQuery("positions", getPositions, {
        select: (data: [IPositionsApi[], IPaginationApi]): IPositions[] => data[0].map(position => ({
            ...position,
            label: position.name,
            value: position.id
        })),
    })

    return {
        ...reactQuery,
        items: reactQuery.data || [],
        loading: reactQuery.isLoading,
    }
}

export const useRanks = () => {
    const reactQuery = useQuery("ranks", getRanks, {
        select: (data: IApiResponse<IRankApi>): IRank[] => data[0].map(rank => ({
            ...rank,
            label: rank.rank,
            value: rank.id
        })),
    })

    return {
        ...reactQuery,
        items: reactQuery.data || [],
        loading: reactQuery.isLoading,
    }
}

export const useSnippets = () => {
    const reactQuery = useQuery("snippets", getSnippets, {
        select: (data: IApiResponse<ISnippetsApi>): ISnippets[] => data[0].map(snippet => ({
            ...snippet,
            label: snippet.content,
            value: snippet.id
        })),
    })

    return {
        ...reactQuery,
        items: reactQuery.data || [],
        loading: reactQuery.isLoading,
    }
}

export const useStatuses = () => {
    const reactQuery = useQuery("statuses", getStatuses, {
        select: (data: IApiResponse<IStatusApi>): IStatus[] => data[0].map(status => ({
            ...status,
            label: status.status,
            value: status.id
        })),
    })

    return {
        ...reactQuery,
        items: reactQuery.data || [],
        loading: reactQuery.isLoading,
    }
}

export const useGradYears = () => {
    const reactQuery = useQuery("gradYears", getGradYears, {
        select: (data: IApiResponse<string>): IGradYears[] => data[0].map(year => ({
            label: year,
            value: year
        })),
    })

    return {
        ...reactQuery,
        items: reactQuery.data || [],
        loading: reactQuery.isLoading,
    }
}

export const useStatus2 = () => {
    const reactQuery = useQuery("status2", getAllStatus2, {
        select: (data: IApiResponse<string>): IStatus_2[] => data[0].map(status => ({
            label: status,
            value: status
        })),
    })

    return {
        ...reactQuery,
        items: reactQuery.data || [],
        loading: reactQuery.isLoading,
    }
}

export const usePlatform = () => {
    const reactQuery = useQuery("platform", getPlatform, {
        select: (data: IApiResponse<IPlatformApi>): IPlatform[] => data[0].map(platform => ({
            ...platform,
            label: platform.name,
            value: platform.id
        })),
    })

    return {
        ...reactQuery,
        items: reactQuery.data || [],
        loading: reactQuery.isLoading,
    }
}

export const useTextPlaceholders = () => {
    const reactQuery = useQuery("textPlaceholders", getTextPlaceholders, {
        select: (data: [ITextPlaceholderApi, IPaginationApi]) => data[0],
    })

    return {
        ...reactQuery,
        items: reactQuery.data,
        loading: reactQuery.isLoading,
    }
}

export const usePeopleTypes = () => {
    const reactQuery = useQuery("peopleTypes", getPeopleTypes, {
        select: (data: IApiResponse<IPeopleTypeApi>): IPeopleType[] => data[0].map(peopleType => ({
            ...peopleType,
            label: peopleType.description,
            value: peopleType.id
        })),
    })

    return {
        ...reactQuery,
        items: reactQuery.data || [],
        loading: reactQuery.isLoading,
    }
}