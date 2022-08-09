import { useEffect, useState } from "react"
import { getTags, getTagsWithContacts, getTagsWithMedia, getTagsWithMessages } from "Api/Endpoints"
import { useQuery } from "react-query"

export const useTags = () => {
    const [tags, setTags] = useState([])
    const reactQuery = useQuery('tags', getTags, {
        select: (data) => data[0],
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (reactQuery.isSuccess) {
            setTags(reactQuery.data)
        }
    }, [reactQuery.data, reactQuery.isSuccess])

    const search = (value) => {
        if (!reactQuery.data) return
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
    const [tags, setTags] = useState([])

    const reactQuery = useQuery('tagsWithMedia', getTagsWithMedia, {
        select: (data) => data[0],
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (reactQuery.isSuccess) {
            setTags(reactQuery.data)
        }
    }, [reactQuery.data, reactQuery.isSuccess])

    const search = (value) => {
        if (!reactQuery.data) return
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

export const useTagsWithContacts = () => {
    const [tags, setTags] = useState([])

    const reactQuery = useQuery('tagsWithContacts', getTagsWithContacts, {
        select: (data) => data[0],
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (reactQuery.isSuccess) {
            setTags(reactQuery.data)
        }
    }, [reactQuery.data, reactQuery.isSuccess])

    const search = (value) => {
        if (!reactQuery.data) return
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
        search
    }
}

export const useTagsWithMessage = () => {
    const [tags, setTags] = useState([])

    const reactQuery = useQuery('tagsWithMessages', getTagsWithMessages, {
        select: (data) => data[0],
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (reactQuery.isSuccess) {
            setTags(reactQuery.data)
        }
    }, [reactQuery.data, reactQuery.isSuccess])

    const search = (value) => {
        if (!reactQuery.data) return
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
        search
    }
}