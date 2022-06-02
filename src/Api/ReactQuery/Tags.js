import { useEffect, useState } from "react"
import { getTags, getTagsWithContacts, getTagsWithMedia, getTagsWithMessages } from "Api/Endpoints"
import { useQuery } from "react-query"

export const useTags = () => {
    const [tags, setTags] = useState([])
    const reactQuery = useQuery('tags', getTags, {
        select: (data) => data[0],
        refetchOnWindowFocus: false,
        staleTime: 60000,
    })

    useEffect(() => {
        if (reactQuery.isSuccess) {
            setTags(reactQuery.data)
        }
    }, [reactQuery.data])

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

export const useTagsWithMedia = () => {
    const reactQuery = useQuery('tagsWithMedia', getTagsWithMedia, {
        select: (data) => data[0],
        refetchOnWindowFocus: false,
        staleTime: 60000,
    })

    return {
        ...reactQuery,
        items: reactQuery.data,
        loading: reactQuery.isLoading,
    }
}

export const useTagsWithContacts = () =>{
    const reactQuery = useQuery('tagsWithContacts', getTagsWithContacts, {
        select: (data) => data[0],
        refetchOnWindowFocus: false,
        staleTime: 60000,
    })

    return {
        ...reactQuery,
        items: reactQuery.data,
        loading: reactQuery.isLoading,
    }
}

export const useTagsWithMessage = () => {
    const reactQuery = useQuery('tagsWithMessages', getTagsWithMessages, {
        select: (data) => data[0],
        refetchOnWindowFocus: false,
        staleTime: 60000,
    })

    return {
        ...reactQuery,
        items: reactQuery.data,
        loading: reactQuery.isLoading,
    }
}