import { useState } from "react"
import { getTags } from "Api/Endpoints"
import { useQuery } from "react-query"

export const useTags = () => {
    const [tags, setTags] = useState([])
    const reactQuery = useQuery('tags', getTags, {
        select: (data) => data[0],
        onSuccess: (data) => setTags(data),
        refetchOnWindowFocus: false,
        staleTime: 60000,
    })

    const search = (value) => {
        if (value && value.length > 0 && reactQuery.data && reactQuery.data.length > 0) {
            const filteredTags = reactQuery.data.filter(tag => tag.name.toLowerCase().includes(value.toLowerCase().trim()))
            setTags(filteredTags)
        } else
            setTags(reactQuery.data)
    }

    return {
        ...reactQuery,
        items: tags,
        loading: reactQuery.isLoading,
        search,
    }
}
