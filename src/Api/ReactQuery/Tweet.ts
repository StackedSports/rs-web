import { useEffect, useState } from "react";
import { createTweet, deleteTweet, getTweet, getTweets, updateTweet } from "Api/Endpoints";
import { IApiResponse, IPaginationApi, ITweet, ITweetApi } from "Interfaces";
import { IPublishTweetMessage } from "Pages/Tweet";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { usePagination } from "Api/Pagination";
import lodash from 'lodash'
import { useTeamMembers } from "./TeamMembers";
import { IMember } from "Interfaces/ISettings";

export const useTweets = (initialPage: number = 1, itemsPerPage: number = 10, initialFilters?: Record<string, unknown[]> | null) => {
    const [tweets, setTweets] = useState<ITweet[]>([])
    const [pagination, setPagination] = usePagination(initialPage, itemsPerPage)
    const [filters, setFilters] = useState(initialFilters)
    const { items } = useTeamMembers()

    const reactQuery = useQuery<IApiResponse<ITweetApi>>(['tweets', pagination.currentPage, pagination.itemsPerPage, filters], () => getTweets(pagination.currentPage, pagination.itemsPerPage, filters))

    useEffect(() => {
        if (reactQuery.isSuccess) {
            const [apiTweets, apiPagination] = reactQuery.data
            setPagination(apiPagination)
            setTweets(apiTweets.map(tweet => {
                const posted_as_names = tweet.posted_as.replaceAll(/@\w+/g, "").trim().toLowerCase()
                const avatarImages = getAvatarImage(posted_as_names, items)
                return {
                    ...tweet,
                    media: tweet.media || [],
                    posted_as: posted_as_names,
                    twitter: tweet.posted_as.split(",").map(s => s.match('\\B@\\w+')?.[0]).join(", ") || '',
                    posted_as_avatar: avatarImages
                }
            }))
        } else if (reactQuery.isError) {
            console.log("setando []")
            setTweets([])
        }
    }, [reactQuery.isSuccess, reactQuery.data, reactQuery.isError])

    useEffect(() => {
        if (initialPage && initialPage != pagination.currentPage) {
            pagination.getPage(initialPage)
        }
    }, [initialPage])

    useEffect(() => {
        if (itemsPerPage && itemsPerPage != pagination.itemsPerPage) {
            pagination.getItemsPerPage(itemsPerPage)
        }
    }, [itemsPerPage])

    useEffect(() => {
        if (!lodash.isEqual(initialFilters, filters)) {
            setFilters(initialFilters)
            pagination.getPage(1)
        }
    }, [initialFilters])

    const filter = (filters: Record<string, unknown[]>) => {
        setFilters(filters)
        pagination.getPage(1)
    }

    const clearFilter = () => {
        setFilters(null)
        pagination.getPage(1)
    }

    return {
        ...reactQuery,
        items: tweets,
        pagination,
        loading: reactQuery.isLoading,
        filter,
        clearFilter,
    }
}

export const useTweet = (id: string) => {
    const { items } = useTeamMembers()
    const reactQuery = useQuery(['tweet', id], () => getTweet(id), {
        enabled: Boolean(id),
        select: (data: [ITweetApi, IPaginationApi]): ITweet => {
            const posted_as_names = data[0].posted_as.replaceAll(/@\w+/g, "").trim().toLowerCase()
            const avatarImages = getAvatarImage(posted_as_names, items)
            return {
                ...data[0],
                media: data[0].media || [],
                posted_as: posted_as_names,
                twitter: data[0].posted_as.split(",").map(s => s.match('\\B@\\w+')?.[0]).join(", ") || '',
                posted_as_avatar: avatarImages
            }
        },
    })

    return {
        ...reactQuery,
        item: reactQuery.data,
        loading: reactQuery.isLoading,
    }
}

export const useTweetMutation = () => {
    const queryClient = useQueryClient();

    const update = useMutation(({ id, data }: { id: string, data: any }) => updateTweet(id, data),
        {
            onSuccess: (_data, variables, _context) => {
                queryClient.invalidateQueries(['tweet', variables.id], { active: true })
                queryClient.invalidateQueries('tweets')
            },
        })

    const remove = useMutation(({ id, archived }: { id: string, archived: boolean }) => deleteTweet(id, archived),
        {
            onSuccess: () => {
                queryClient.cancelQueries('tweet', { active: true })
                queryClient.resetQueries('tweets')
            }
        })

    const create = useMutation((tweet: IPublishTweetMessage) => createTweet(tweet),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('tweets')
            },
        })

    return {
        update: update.mutate,
        updateAsync: update.mutateAsync,
        remove: remove.mutate,
        create: create.mutate,
        createAsync: create.mutateAsync,
    }
}

function getAvatarImage(posted_as: string, teamMembers: IMember[]) {
    const profilesImage = teamMembers.filter(member =>
        posted_as.includes(member.first_name.toLowerCase()) || posted_as.includes(member.last_name.toLowerCase())).
        map(member => member.twitter_profile.profile_image)
    return lodash.uniq(profilesImage)
}