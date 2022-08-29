import { useEffect, useState } from "react"
import { createTag, deleteTag, getTags, getTagsWithContacts, getTagsWithMedia, getTagsWithMessages, updateTag } from "Api/Endpoints"
import { useMutation, useQuery, useQueryClient } from "react-query"

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

    const reactQuery = useQuery(['tags', 'WithMedia'], getTagsWithMedia, {
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

    const reactQuery = useQuery(['tags', 'WithContacts'], getTagsWithContacts, {
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

    const reactQuery = useQuery(['tags', 'WithMessages'], getTagsWithMessages, {
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

export const useTagMutation = () => {
    const queryClient = useQueryClient();

    const create = useMutation((name) => createTag(name), {
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries(['media'])
            queryClient.invalidateQueries(['medias'])
            queryClient.invalidateQueries(['contact'])
            queryClient.invalidateQueries(['contacts'])
            queryClient.invalidateQueries(['message'])
            queryClient.invalidateQueries(['messages'])
            queryClient.invalidateQueries(['tags'])
        },
    });

    const update = useMutation(({ id, name }) => updateTag(id, name),
        {
            onSuccess: (data, variables, context) => {
                queryClient.invalidateQueries(['media'])
                queryClient.invalidateQueries(['medias'])
                queryClient.invalidateQueries(['contact'])
                queryClient.invalidateQueries(['contacts'])
                queryClient.invalidateQueries(['message'])
                queryClient.invalidateQueries(['messages'])
                queryClient.invalidateQueries(['tags'])
            },
        })

    const remove = useMutation((id) => deleteTag(id), {
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries(['media'])
            queryClient.invalidateQueries(['medias'])
            queryClient.invalidateQueries(['contact'])
            queryClient.invalidateQueries(['contacts'])
            queryClient.invalidateQueries(['message'])
            queryClient.invalidateQueries(['messages'])
            queryClient.invalidateQueries(['tags'])
        },
    })

    return {
        create: create.mutate,
        update: update.mutate,
        updateAsync: update.mutateAsync,
        remove: remove.mutate,
        removeAsync: remove.mutateAsync,
    }
}