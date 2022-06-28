import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { getTeamMember, getTeamMembers } from "Api/Endpoints"
import { getFullName } from "utils/Parser"

export const useTeamMembers = ({ has_twitter = false, has_rs_text = false } = {}) => {
    const [teamMembers, setTeamMembers] = useState([])
    const reactQuery = useQuery(["teamMembers", has_twitter, has_rs_text], () => getTeamMembers({ has_twitter, has_rs_text }), {
        select: (data) => data[0],
    })

    useEffect(() => {
        if (reactQuery.isSuccess) {
            setTeamMembers(reactQuery.data)
        }
    }, [reactQuery.data, reactQuery.isSuccess])

    const search = (value) => {
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

export const useTeamMember = (id) => {
    const reactQuery = useQuery(`teamMember/${id}`, () => getTeamMember(id), {
        select: (data) => data[0],
    })

    return {
        ...reactQuery,
        item: reactQuery.data,
        loading: reactQuery.isLoading,
    }
}
