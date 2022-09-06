import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { getTeamMember, getTeamMembers } from "Api/Endpoints"
import { getFullName } from "utils/Parser"
import { IApiResponse, IPaginationApi } from "Interfaces"
import { IMember, IMemberApi } from "Interfaces/ISettings"

export const useTeamMembers = () => {
    const [teamMembers, setTeamMembers] = useState<IMember[]>([])
    const reactQuery = useQuery("teamMembers", getTeamMembers, {
        select: (data: IApiResponse<IMemberApi>): IMember[] => data[0].map(member => ({
            ...member,
            label: getFullName(member),
            value: member.id
        })),
    })

    useEffect(() => {
        if (reactQuery.isSuccess) {
            setTeamMembers(reactQuery.data)
        }
    }, [reactQuery.data, reactQuery.isSuccess])

    const search = (value: string) => {
        if (!reactQuery.data) return
        if (value && value.length > 0 && reactQuery.data) {
            const filteredTeamMembers = reactQuery.data.
                filter(teamMember => getFullName(teamMember).
                    toLowerCase().
                    includes(value.toLowerCase().trim()))
            setTeamMembers(filteredTeamMembers)
        } else {
            setTeamMembers(reactQuery.data)
        }
    }

    return {
        ...reactQuery,
        items: teamMembers,
        loading: reactQuery.isLoading,
        search,
    }
}

export const useTeamMember = (id: string) => {
    const reactQuery = useQuery(`teamMember/${id}`, () => getTeamMember(id), {
        enabled: !!id,
        select: (data: [IMemberApi, IPaginationApi]): IMember => ({
            ...data[0],
            value: data[0].id,
            label: getFullName(data[0])
        }),
    })

    return {
        ...reactQuery,
        item: reactQuery.data,
        loading: reactQuery.isLoading,
    }
}
