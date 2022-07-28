import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { getTeamMember, getTeamMembers } from "Api/Endpoints"
import { getFullName } from "utils/Parser"
import { ITeamMember } from "Interfaces"

export const useTeamMembers = () => {
    const [teamMembers, setTeamMembers] = useState<ITeamMember[]>([])
    const reactQuery = useQuery("teamMembers", getTeamMembers, {
        select: (data) => data[0],
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
                filter((teamMember: ITeamMember) => getFullName(teamMember).
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

export const useTeamMember = (id: number) => {
    const reactQuery = useQuery(`teamMember/${id}`, () => getTeamMember(id), {
        select: (data) => data[0],
    })

    return {
        ...reactQuery,
        item: reactQuery.data,
        loading: reactQuery.isLoading,
    }
}
